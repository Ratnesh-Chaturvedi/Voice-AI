import dotenv from "dotenv";

 dotenv.config();

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { PrismaPg } from "@prisma/adapter-pg";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

import {
    PrismaClient,
    type VoiceCategory,
} from "../src/generated/prisma/client";

import { CANONICAL_SYSTEM_VOICE_NAMES } from "../src/features/voices/data/voice-scoping";




const SYSTEM_VOICES_DIR = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "system-voices",
);

const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
});

const env = envSchema.parse(process.env);

const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});



console.log({
  cloud: env.CLOUDINARY_CLOUD_NAME,
  key: env.CLOUDINARY_API_KEY,
  hasSecret: !!env.CLOUDINARY_API_SECRET,
});



interface VoiceMetadata {
    description: string;
    category: VoiceCategory;
    language: string;
}


const systemVoiceMetadata: Record<string, VoiceMetadata> = {
 
    Abigail: {
        description: "Friendly and conversational with a warm, approachable tone",
        category: "CONVERSATIONAL",
        language: "en-GB",
    },
    Anaya: {
        description: "Polite and professional, suited for customer service",
        category: "CUSTOMER_SERVICE",
        language: "en-IN",
    },
    Andy: {
        description: "Versatile and clear, a reliable all-purpose narrator",
        category: "GENERAL",
        language: "en-US",
    },
    Archer: {
        description: "Laid-back and reflective with a steady, storytelling pace",
        category: "NARRATIVE",
        language: "en-US",
    },
    Brian: {
        description: "Professional and helpful with a clear customer support tone",
        category: "CUSTOMER_SERVICE",
        language: "en-US",
    },
    Chloe: {
        description: "Bright and bubbly with a cheerful, outgoing personality",
        category: "CORPORATE",
        language: "en-AU",
    },
    Dylan: {
        description:
            "Thoughtful and intimate, like a quiet late-night conversation",
        category: "GENERAL",
        language: "en-US",
    },
    Emmanuel: {
        description: "Nasally and distinctive with a quirky, cartoon-like quality",
        category: "CHARACTERS",
        language: "en-US",
    },
    Ethan: {
        description: "Polished and warm with crisp, studio-quality delivery",
        category: "VOICEOVER",
        language: "en-US",
    },
    Evelyn: {
        description: "Warm Southern charm with a heartfelt, down-to-earth feel",
        category: "CONVERSATIONAL",
        language: "en-US",
    },
    Gavin: {
        description: "Calm and reassuring with a smooth, natural flow",
        category: "MEDITATION",
        language: "en-US",
    },
    Gordon: {
        description: "Warm and encouraging with an uplifting, motivational tone",
        category: "MOTIVATIONAL",
        language: "en-US",
    },
    Ivan: {
        description: "Deep and cinematic with a dramatic, movie-character presence",
        category: "CHARACTERS",
        language: "ru-RU",
    },
    Laura: {
        description: "Authentic and warm with a conversational Midwestern tone",
        category: "CONVERSATIONAL",
        language: "en-US",
    },
    Lucy: {
        description: "Direct and composed with a professional phone manner",
        category: "CUSTOMER_SERVICE",
        language: "en-US",
    },
    Marisol: {
        description: "Confident and polished with a persuasive, ad-ready delivery",
        category: "ADVERTISING",
        language: "en-US",
    },
    Meera: {
        description: "Friendly and helpful with a clear, service-oriented tone",
        category: "CUSTOMER_SERVICE",
        language: "en-IN",
    },
    Walter: {
        description: "Old and raspy with deep gravitas, like a wise grandfather",
        category: "NARRATIVE",
        language: "en-US",
    },
};
async function readSystemVoiceAudio(name: string) {
    const filePath = path.join(
        SYSTEM_VOICES_DIR,
        `${name}.wav`,
    );

    const buffer = Buffer.from(await fs.readFile(filePath));

    return {
        buffer,
        contentType: "audio/wav",
    };
}

async function uploadSystemVoiceAudio({
    key,
    buffer,
}: {
    key: string;
    buffer: Buffer;
}): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    resource_type: "video",
                    public_id: key,
                   folder:"voice-ai/custom/voices",
                    format:"wav",
                    overwrite: true,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(result!);
                },
            )
            .end(buffer);
    });
}
async function seedSystemVoice(name: string) {
    const { buffer } = await readSystemVoiceAudio(name);

    const existingSystemVoice = await prisma.voice.findFirst({
        where: {
            variant: "SYSTEM",
            name,
        },
        select: {
            id: true,
        },
    });

    if (existingSystemVoice) {
        const r2ObjectKey = `voices/system/${existingSystemVoice.id}`;
        const meta = systemVoiceMetadata[name];

        const upload = await uploadSystemVoiceAudio({
            key: r2ObjectKey,
            buffer,
        });

        await prisma.voice.update({
            where: {
                id: existingSystemVoice.id,
            },
            data: {
                r2ObjectKey: upload.public_id,
                ...(meta && {
                    description: meta.description,
                    category: meta.category,
                    language: meta.language,
                }),
            },
        });
        return;
    }

    const meta = systemVoiceMetadata[name];

    const voice = await prisma.voice.create({
        data: {
            name,
            variant: "SYSTEM",
            orgId: null,

            ...(meta && {
                description: meta.description,
                category: meta.category,
                language: meta.language,
            }),
        },
        select: {
            id: true,
        },
    });

    const r2ObjectKey = `voices/system/${voice.id}`;
    try {
        const upload = await uploadSystemVoiceAudio({
            key: r2ObjectKey,
            buffer,
        });

        await prisma.voice.update({
            where: {
                id: voice.id,
            },
            data: {
                r2ObjectKey: upload.public_id,
            },
        });
    } catch (error) {
        await prisma.voice
            .delete({
                where: {
                    id: voice.id,
                },
            })
            .catch(() => { });

        throw error;
    }
}

async function main() {


    console.log(
        `Seeding ${CANONICAL_SYSTEM_VOICE_NAMES.length} system voices...`,
    );


    for (const name of CANONICAL_SYSTEM_VOICE_NAMES) {
        console.log(`- ${name}`);
        await seedSystemVoice(name);
    }
    console.log("System voice seed completed.");
}
main()
    .catch((error) => {
        console.error("Failed to seed system voices:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });