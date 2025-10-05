import * as path from 'path';
import * as vscode from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  Executable
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
  console.log('UP extension is now active');

  // Create output channel
  outputChannel = vscode.window.createOutputChannel('UP Language Server');
  context.subscriptions.push(outputChannel);

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('up.restartLanguageServer', async () => {
      await restartLanguageServer();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('up.showOutputChannel', () => {
      outputChannel.show();
    })
  );

  // Start language server if enabled
  const config = vscode.workspace.getConfiguration('up');
  if (config.get<boolean>('languageServer.enabled', true)) {
    startLanguageServer(context);
  }

  // Watch for configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('up.languageServer.enabled')) {
        const enabled = vscode.workspace
          .getConfiguration('up')
          .get<boolean>('languageServer.enabled', true);

        if (enabled && !client) {
          startLanguageServer(context);
        } else if (!enabled && client) {
          stopLanguageServer();
        }
      }
    })
  );
}

async function startLanguageServer(context: vscode.ExtensionContext) {
  if (client) {
    return; // Already started
  }

  const config = vscode.workspace.getConfiguration('up');
  const serverPath = config.get<string>('languageServer.path', 'up-language-server');
  const serverArgs = config.get<string[]>('languageServer.args', []);
  const traceLevel = config.get<string>('languageServer.trace.server', 'off');

  // Check if server is available
  try {
    const executable: Executable = {
      command: serverPath,
      args: serverArgs,
      options: {}
    };

    const serverOptions: ServerOptions = executable;

    const clientOptions: LanguageClientOptions = {
      documentSelector: [{ scheme: 'file', language: 'up' }],
      synchronize: {
        fileEvents: vscode.workspace.createFileSystemWatcher('**/*.{up,up-schema}')
      },
      outputChannel: outputChannel,
      traceOutputChannel: outputChannel,
      revealOutputChannelOn: 4 // RevealOutputChannelOn.Never
    };

    client = new LanguageClient(
      'upLanguageServer',
      'UP Language Server',
      serverOptions,
      clientOptions
    );

    // Set trace level
    await client.setTrace(traceLevel as any);

    // Start the client
    await client.start();

    outputChannel.appendLine('UP Language Server started successfully');

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    outputChannel.appendLine(`Failed to start UP Language Server: ${errorMessage}`);

    const action = await vscode.window.showErrorMessage(
      `Failed to start UP Language Server. Make sure 'up-language-server' is installed.`,
      'Install Language Server',
      'Show Output',
      'Disable'
    );

    if (action === 'Install Language Server') {
      vscode.env.openExternal(
        vscode.Uri.parse('https://github.com/uplang/tools/tree/main/language-server#installation')
      );
    } else if (action === 'Show Output') {
      outputChannel.show();
    } else if (action === 'Disable') {
      await config.update('languageServer.enabled', false, vscode.ConfigurationTarget.Global);
    }
  }
}

async function stopLanguageServer() {
  if (client) {
    await client.stop();
    client = undefined;
    outputChannel.appendLine('UP Language Server stopped');
  }
}

async function restartLanguageServer() {
  outputChannel.appendLine('Restarting UP Language Server...');
  await stopLanguageServer();
  const context = (global as any).extensionContext;
  await startLanguageServer(context);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}

