# Incomplete Insurance Scraper Takehome

Incomplete. Only scraping tables.

## How to use
run 'npm i' and then 'npm run build'<br>
To start the app run 'npm run watch'. Then make a post request to <br>
localhost:3535/scrape<br>

// Example req.body (JSON) input<br>

/*
[{
	"carrier": "MOCK_INDEMNITY",
	"customerId": "a0dfjw9a"
},{
  "carrier": "PLACEHOLDER_CARRIER",
	"customerId": "f02dkl4e"
}]
*/


// Which gives this output. Scraping only tables in all internal links.<br>
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

## Part 2

If I am designing against scraping, I would rate limit, require a login, use AI to detect patterns and create rules to counteract those scraping patterns, and have reference data for normal usage have a rule to block traffic that falls outside this normal usage.

## Part 3

To get around rate limitations, I would only try to scrape what I need and cache it, to minimize the amount of data I need in my request and responses when scraping. I would use multiple logins, so if one is blocked I can still scrape. Also, I would use multiple logins as a default to break up my scraping to get around rules for detecting unusual activity for a single account. This includes using different IP addresses (VPN) for each account. All of this would be automated. I would map my scraping times to be weighted more towards high-medium and medium times, because activity spikes are more likely to be detected at low usage periods. Finally, AI can also be used as a pro-scraping tool. With AI, I can create scraping rules based on when scraping has been more successful.

Great references for anti scraping techniques:<br>
https://engineering.linkedin.com/blog/2021/using-deep-learning-to-detect-abusive-sequences-of-member-activi<br>
https://blog.linkedin.com/2021/july/15/linkedin-safety-series-what-is-scraping<br>


