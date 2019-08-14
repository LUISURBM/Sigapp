export interface IOathProvider {
    login(): Promise<any>;
    getUrlLogin(): string;
}
