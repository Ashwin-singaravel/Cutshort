
export interface Config {
    app: App;
}

interface App {
    version: string;
    name: string;
    port: number;
}