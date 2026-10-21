document.addEventListener('DOMContentLoaded', () => {
    const ans = document.getElementById('f-ans'); 
    const btn = document.getElementById('f-crt_btn');

    const createArticle = async () => {
        const projectId = document.getElementById('f-p_id').value;
        const title = document.getElementById('f-title').value;
        const slug = document.getElementById('f-slug').value;
        const content = document.getElementById('f-content').value;

        if (!title) {
            ans.innerText = "'title' field is required";
            return;
        }

        try {
            const res = await fetch('/api/article/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project_id: projectId,
                    title: title,
                    slug: slug,
                    content: content,
                })
            });

            if (res.ok) {
                const responseText = await res.text();
                ans.innerText = "article created successfully: " + responseText;
            } else {
                const errorText = await res.text();
                ans.innerText = `api error (${res.status}): ${errorText}`;
                console.error("api response error", res.status, errorText);
            }
        } catch (err) {
            ans.innerText = "conn error";
            console.error(err);
        }
    };

    btn.addEventListener('click', createArticle);
});