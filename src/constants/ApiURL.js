

export const ApiBasePath = {
    EntryQuery: 'https://localhost:44344/api',
}

class ApiURL {
    static Query = {
        GetLogin: ApiBasePath.EntryQuery + '/login',
        GetUser: ApiBasePath.EntryQuery + '/user',
        GetCoinMarketCap: ApiBasePath.EntryQuery + '/coinmarketcap',
    }

}

export { ApiURL }