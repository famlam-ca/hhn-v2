import { exec } from "child_process"
import { NextRequest, NextResponse } from "next/server"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { stdout, stderr } = await execAsync("bun db:reset")

    console.log(`Command stdout: ${stdout}`)
    console.error(`Command stderr: ${stderr}`)

    return NextResponse.json(
      {
        message: "Command executed successfully",
        output: stdout + stderr, // Including both stdout and stderr in the output
      },
      {
        status: 200,
      },
    )
  } catch (error: any) {
    console.error(`Error executing command: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
