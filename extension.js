const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const outputChannel = vscode.window.createOutputChannel(
		"Browser Tools Server",
	);

	const startServer = () => {
		const { exec } = require("node:child_process");
		const proc = exec("bunx @agentdeskai/browser-tools-server");

		proc.stdout.on("data", (info) =>
			outputChannel.appendLine(`Log: ${info.toString()}`),
		);
		proc.stderr.on("data", (info) =>
			outputChannel.appendLine(`Error: ${info.toString()}`),
		);

		return proc;
	};

	let proc = startServer();

	const disposable = vscode.commands.registerCommand(
		"browserTools.restartServer",
		() => {
			// Add logic to restart the server here
			proc.kill();
			proc = startServer();
		},
	);

	context.subscriptions.push(disposable);
}

function deactivate() {
	// Add logic to stop the server here
}

module.exports = {
	activate,
	deactivate,
};
