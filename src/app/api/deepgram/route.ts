import { NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";

export const dynamic = "force-dynamic";

export async function GET() {
    if (!process.env.DEEPGRAM_API_KEY) {
        return NextResponse.json(
            { error: "DEEPGRAM_API_KEY is not set" },
            { status: 500 }
        );
    }

    try {
        const deepgram = createClient(process.env.DEEPGRAM_API_KEY.trim());

        let projectId = process.env.DEEPGRAM_PROJECT_ID;

        // Auto-resolve Project ID if missing
        if (!projectId) {
            try {
                const { result: projects, error: projectsError } = await deepgram.manage.getProjects();
                if (projectsError) {
                    console.warn("Deepgram Notice: Could not list projects with current key permissions. Falling back to primary API key for browser stream.");
                    return NextResponse.json({ key: process.env.DEEPGRAM_API_KEY.trim() });
                }
                if (projects?.projects?.[0]) {
                    projectId = projects.projects[0].project_id;
                }
            } catch (err) {
                console.warn("Deepgram Notice: Management API unavailable. Falling back to primary API key.", err);
                return NextResponse.json({ key: process.env.DEEPGRAM_API_KEY.trim() });
            }
        }

        if (!projectId) {
            // Fallback directly to using the primary API key
            return NextResponse.json({ key: process.env.DEEPGRAM_API_KEY.trim() });
        }

        // Create a temporary key that lasts for 10 seconds
        const { result, error } = await deepgram.manage.createProjectKey(
            projectId,
            {
                comment: "Ephemeral key for browser client",
                scopes: ["usage:write"],
                time_to_live_in_seconds: 10,
            }
        );

        if (error) {
            console.error("Deepgram Error: Could not create ephemeral key (Check API Permissions).", error);
            // Fallback: If we can't create a key, we must use the server one (less secure but functional).
            // WARN: The user should upgrade their key permissions to 'Admin' or 'Owner' for production security.
            return NextResponse.json({ key: process.env.DEEPGRAM_API_KEY });
        }

        return NextResponse.json({ key: result.key });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Deepgram Auth Error:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to generate temporary key." },
            { status: 500 }
        );
    }
}
