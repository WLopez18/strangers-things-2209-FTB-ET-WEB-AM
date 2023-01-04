const COHORT_NAME = '2209-FTB-ET-WEB-AM'

export const createPost = async (props) => {
    const token = props.token;
    const title = props.title;
    const description = props.description;
    const price = props.price;
    const willDeliver = props.willDeliver;
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    willDeliver,
                    location
                },
            }),
        });
        const result = await response.json();
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
}