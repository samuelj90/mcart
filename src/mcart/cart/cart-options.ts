export interface CartOptions {
    localSyncingEnabled: boolean,
    remoteSyncingEnabled: boolean,
    endpoints?: {
        getCartItems: string,
        addItemToCart: string,
    }
}