# JavaScript Boilerplate

Incomplete. Only scraping tables.

## How to use
run 'npm i' and then 'npm run build'
To start the app run npm run watch. Then make a post request to 
localhost:3535/scrape

// Example input
/*
[{
	"carrier": "MOCK_INDEMNITY",
	"customerId": "a0dfjw9a"
},{
  "carrier": "PLACEHOLDER_CARRIER",
	"customerId": "f02dkl4e"
}]
*/

// Which gives this output. Scraping only tables in all internal links.
/*
{
    "a0dfjw9a": {},
    "f02dkl4e": {
        "tzmgis4dk3": {
            "Id": "tzmgis4dk3",
            "Premium": "5757.00",
            "Status": "pending_cancelation",
            "Effective Date": "9/10/2021",
            "Termination Date": "1/18/2022"
        },
        "j310ut4g14": {
            "Id": "j310ut4g14",
            "Premium": "9887.00",
            "Status": "endorsement_pending",
            "Effective Date": "9/10/2021",
            "Termination Date": "4/27/2022"
        },
        "s0243utqc9": {
            "Id": "s0243utqc9",
            "Premium": "5339.00",
            "Status": "endorsement_pending",
            "Effective Date": "9/10/2021",
            "Termination Date": "7/7/2022"
        },
        "fanbk4an5k": {
            "Id": "fanbk4an5k",
            "Premium": "7457.00",
            "Status": "active",
            "Effective Date": "9/9/2021",
            "Termination Date": "11/20/2021"
        },
        "6vzdbmyptv": {
            "Id": "6vzdbmyptv",
            "Premium": "295.00",
            "Status": "endorsement_pending",
            "Effective Date": "9/9/2021",
            "Termination Date": "3/9/2022"
        },
        "yg1rv0s70s": {
            "Id": "yg1rv0s70s",
            "Premium": "1572.00",
            "Status": "endorsement_pending",
            "Effective Date": "9/9/2021",
            "Termination Date": "12/10/2021"
        },
        "9vkwjijmvt": {
            "Id": "9vkwjijmvt",
            "Premium": "3969.00",
            "Status": "endorsement_pending",
            "Effective Date": "9/10/2021",
            "Termination Date": "3/8/2022"
        },
        "wpk6r2j1yk": {
            "Id": "wpk6r2j1yk",
            "Premium": "6002.00",
            "Status": "pending_cancelation",
            "Effective Date": "9/10/2021",
            "Termination Date": "6/18/2022"
        },
        "rzk89nxr50": {
            "Id": "rzk89nxr50",
            "Premium": "463.00",
            "Status": "endorsement_pending",
            "Effective Date": "9/10/2021",
            "Termination Date": "12/22/2021"
        },
        "h2mf6vi2q9": {
            "Id": "h2mf6vi2q9",
            "Premium": "2244.00",
            "Status": "claim_pending",
            "Effective Date": "9/10/2021",
            "Termination Date": "1/24/2022"
        },
        "iqgho6bp5s": {
            "Id": "iqgho6bp5s",
            "Premium": "2386.00",
            "Status": "active",
            "Effective Date": "9/10/2021",
            "Termination Date": "1/28/2022"
        }
    }
}
*/
