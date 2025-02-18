import { headers } from 'next/headers';

export default async function AliasPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const requestHeaders = headers();
    console.log(requestHeaders)
    const ip = requestHeaders.get('x-forwarded-for')?.split(',')[0].trim() ||
        requestHeaders.get('x-real-ip') ||
        'unknown';

    const userAgent = requestHeaders.get('user-agent') || '';

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/shorten/?alias=${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': ip,
            'User-Agent': userAgent
        },
    });

    const data = await response.json();

    if (!response.ok || !data.message) {
        return <h1>URL Not Found</h1>;
    }

    // Redirect User to Original URL
    return (
        <html>
            <head>
                <meta httpEquiv="refresh" content={`0;url=${data.message}`} />
            </head>
            <body>
                <p>Redirecting to {data.message}...</p>
            </body>
        </html>
    );
}


