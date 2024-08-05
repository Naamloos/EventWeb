export default function InstagramComponent({username, height} : {username: string, height: number})
{
    return <>
        <iframe
            src={`https://www.instagram.com/${username}/embed/`}
            allowTransparency
            allowFullScreen
            height={height}
            style={{
                width: "100%",
                maxHeight: "100%",
            }}
            className="opacity-80"
        />
    </>
}
