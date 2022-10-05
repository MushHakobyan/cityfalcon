import {ref} from 'vue'
import {getData} from '@/api/getData.js'

export const useStories = () => {
    const stories = ref([])
    const next_page_token = ref('')
    const exe = async () => {
        const data = await getData('retweeted', 'en', '')
        stories.value = data.stories
        next_page_token.value = data.next_page_token
    }
     
    exe()
    return { stories, next_page_token }
}

