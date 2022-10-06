const newCommentHandler = async (event) => {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    const comment = document.querySelector('#post-comment').value.trim();

    console.log(comment);
    console.log(post_id);

    if (comment && post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add a comment');
        }
    }
};

document.querySelector('.new-comment').addEventListener('submit', newCommentHandler);