import { XCResultParallelParser } from './lib/xcresult_parser.js';
import path from 'path';

// Extract target arguments passed dynamically from shell parameters execution environments
const inputArgs = process.argv.slice(2);
const defaultBundle = inputArgs[0] || "./AppWorkspace.xcresult";
const defaultOutput = inputArgs[1] || "./TestReport.md";

const resolvedInputPath = path.resolve(defaultBundle);
const resolvedOutputPath = path.resolve(defaultOutput);

const orchestrator = new XCResultParallelParser(resolvedInputPath, resolvedOutputPath);

(async () => {
    try {
        await orchestrator.processResultBundle();
    } catch (e) {
        console.error("[FATAL ERROR ENTRY GATE]: Processing worker lifecycle failed.", e.message);
        process.exit(1);
    }
})();
