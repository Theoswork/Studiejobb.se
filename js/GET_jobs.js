
   async function fetchJobPosts() {
       const response = await fetch('/api/job-posts');
       const jobPosts = await response.json();

       const jobPostsDiv = document.getElementById('jobPosts');
       jobPosts.forEach(post => {
           const jobElement = document.createElement('div');
           jobElement.innerHTML = `<h3>${post.title}</h3><p>${post.description}</p><p>${post.company}</p>`;
           jobPostsDiv.appendChild(jobElement);
       });
   }

   fetchJobPosts();

