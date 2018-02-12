export interface CartOptions {
    isLocalSyncingEnabled: boolean,
    isRemoteSyncingEnabled: boolean,
    endpoints?: {
        getCartItems: string,
        addToCart: string,
    }
}