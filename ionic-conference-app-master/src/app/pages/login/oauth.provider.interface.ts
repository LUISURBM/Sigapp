export interface IOathProvider {
    login(): Promise<any>;
}
