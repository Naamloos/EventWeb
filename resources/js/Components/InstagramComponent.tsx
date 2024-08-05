export default function InstagramComponent({username, height} : {username: string, height: number})
{
    return <>
        <iframe
            src={`https://www.instagram.com/${username}/embed/?cr=1&v=12&wp=540&rd=https%3A%2F%2Fwww.instaembedcode.com&rp=%2F#%7B%22ci%22%3A0%2C%22os%22%3A19351%2C%22ls%22%3A19247%2C%22le%22%3A19347%7D`}
            allowTransparency
            allowFullScreen
            height={height}
            data-instgrm-payload-id="instagram-media-payload-0"
            style={{
                width: "100%",
                maxHeight: "100%",
            }}
        />
    </>
}
