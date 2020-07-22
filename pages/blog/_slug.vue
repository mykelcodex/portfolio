<template>
  <div>
    <div class="mt-10 px-6 sm:px-10 lg:px-20 xl:px-32">
      <div class="mt-5 mb-8 max-w-3xl mx-auto">
        <nuxt-link to="/blog">
          <svg width="24" class="text-yellow hover:text-darkest transition ease-out duration-700 w-10 h-10 stroke-current" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 15L8 12M8 12L11 9M8 12L16 12M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </nuxt-link>
      </div>
      <div>
        <div class="max-w-3xl mx-auto">
          <h2 class="text-2xl md:text-3xl lg:text-4xl text-white font-semibold">{{ post.fields.title }}</h2>
          <p class="mt-3 mb-6 lg:mb-10 text-light-purple">{{ post.sys.createdAt | toDate }}</p>
          <img :src="post.fields.cover.fields.file.url" class="h-48 md:h-65 rounded-lg shadow-lg w-full object-cover"/>
          <div class="markdown py-10">
            <div v-html="$md.render(post.fields.content)"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-3xl mx-auto">
      <div id="disqus_thread"></div>
    </div>
  </div>
</template>

<script>
   import client from '~/plugins/contentful';
  export default {
    asyncData({ params, error, payload }){
      // if(payload) return { post: payload }
      return client.getEntries({
        content_type: 'post',
        'fields.slug': params.slug
      }).then(entries=>{
        return { post: entries.items[0] }
      }).catch(e =>{ console.log(e) })
    },
    head(){
      return{
        title: 'Oke Michael' - this.post.fields.title,
        meta : [
          { hid: 'description', name: 'description', content: this.post.fields.title.substring(0, 100) },
          { name: 'keywords', content: ['Oke Michael','Mykelcodex','Michael Oke','Software Engineer in Nigeria','Software','Laravel Developer','Vuejs Developer','Open Source','Develop Community','PHP','Javascript'] },
          { name: 'robots', content: 'all' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: this.post.fields.title },
          { name: 'twitter:description', content: this.$md.render(this.post.fields.content).substring(0, 200) + '...' },
          { name: 'twitter:site', content: '@mykelcodex' },
          { name: 'twitter:image', content: this.post.fields.cover.fields.file.url },
          { name: 'twitter:creator', content: '@mykelcodex' },
        ],
        link:[
          {
            rel: 'canonical',
            href: 'https://omike.me/' + this.post.fields.slug
          }
        ]
      }
    },
    mounted(){
      var disqus_config = function () {
      this.page.url = window.location.href + this.post.fields.slug;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = post.fields.slug; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://oke-michael.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    }

  }
</script>

<style lang="scss" scoped>
  
</style>