<script setup>
import {ref, reactive, onMounted} from 'vue'
import { onClickOutside, useInfiniteScroll } from '@vueuse/core'
import StoryCardItem from '@/components/StoryCardItem.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import {useStories} from '@/composables/stories.js'
import {getData} from '@/api/getData.js'


const {stories, next_page_token} = useStories()

const reload = () => document.location.reload()

const refreshOptions = [
    {text: '10 sec', value: '10000'},
    {text: '30 sec', value: '30000'},
    {text: '1 min', value: '60000'},
    {text: '10 min', value: '600000'}
]
let selectedRefreshValue = reactive({text: ref('1 min'), value: ref('60000')})

const orderOptions = [
    {text: 'Top Rated', value: 'top'},
    {text: 'Latest', value: 'latest'},
    {text: 'Most Read', value: 'read'},
    {text: 'Popular', value: 'retweeted'}
]
let selectedOrderValue = reactive({text: 'Popular', value: 'retweeted'})

const langOptions = [
    {text: 'Select / Unselect All', value: 'en,de,zh,it'},
    {text: 'English', value: 'en'},
    {text: 'German', value: 'de'},
    {text: 'Chinese', value: 'zh'},
    {text: 'Italian', value: 'it'}
]
let selectedLangValue = reactive({text: 'English', value: 'en'})


const updateData = async (order, lang, token) => {
    const data = await getData(order.value, lang.value, token.value)
    stories.value = data.stories
    next_page_token.value = data.next_page_token
}


let interval = setInterval(() => updateData(selectedOrderValue, selectedLangValue, next_page_token), +selectedRefreshValue.value)


const updateRefreshValue = (e) => {
    selectedRefreshValue = e
    onRefreshValueUpdated()
}
const onRefreshValueUpdated = () => {
    clearInterval(interval)
    interval = setInterval(() => updateData(selectedOrderValue, selectedLangValue, next_page_token), +selectedRefreshValue.value)
}

const onSelectedValueUpdated = () => {
    updateData(selectedOrderValue, selectedLangValue ,next_page_token)
}

const key = ref(true)

const reset = () => {
    selectedRefreshValue = {text: ref('1 min'), value: ref('60000')}
    selectedOrderValue = {text: 'Popular', value: 'retweeted'}
    selectedLangValue = {text: 'English', value: 'en'}
    key.value = !key.value
    onRefreshValueUpdated()
    onSelectedValueUpdated()
}

const openFilter = ref(false)

useInfiniteScroll(document, async () => {
    const data = await getData(selectedOrderValue.value, selectedLangValue.value, next_page_token.value)
    stories.value = stories.value.concat(data.stories)
    next_page_token.value = data.next_page_token
  },
  { distance: 10 }
)
</script>

<template>
    <main>
        <div class="watchlist-name">Watchlist Name</div>
        <div class="filter-sec">
            <button class="refresh" @click="reload">
                <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size="lg" />
                Refresh
            </button>
            <button ref="filterButton" :class="['filter', {active: openFilter}]" @click="openFilter = !openFilter">
                <font-awesome-icon icon="fa-solid fa-filter" size="lg" />
                Filters
            </button>
            <div v-show="openFilter" class="filters">
                <div class="field">
                    <CustomSelect
                        :key="key"
                        label="Autorefresh"
                        :options="refreshOptions"
                        :defaultValue="selectedRefreshValue"
                        @update-value="updateRefreshValue"
                    />
                </div>
                <div class="field">
                    <CustomSelect
                        :key="key"
                        label="Order"
                        :options="orderOptions"
                        :defaultValue="selectedOrderValue"
                        @update-value="(e) => {selectedOrderValue = e; onSelectedValueUpdated()}"
                    />
                </div>
                <div class="field">
                    <CustomSelect
                        :key="key"
                        label="Languages"
                        :options="langOptions"
                        :defaultValue="selectedLangValue"
                        @update-value="(e) => {selectedLangValue = e; onSelectedValueUpdated()}"
                    />
                </div>
                <div class="field" @click="reset">
                    <button class="reset">Reset</button>
                </div>
                                
            </div>
        </div>

        <div class="stories" v-if="stories.length">
            <template v-for="story in stories" :key="story.id">
                <StoryCardItem :story="story" />
            </template> 
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    padding: 30px 70px;
    .watchlist-name {
        font-size: 24px;
        font-weight: bold;
        color: #3971c1;
    }
    .filter-sec {
        margin: 15px 0 20px;
        button {
            border: 1px solid #e0e0e0;
            border-radius: 3px;
            padding: 11px 13px;
            font-size: 13px;
            font-weight: bold;
            color: #292929;
            background-color: #fff;
            position: relative;
            cursor: pointer;
            &:hover, &.active {
                background-color: #eee;
                border-color: #eee
            }
            &.filter {
                margin-left: 6px;
                &.active::after {
                    content: '';
                    display: inline-block;
                    border-bottom: 14px solid #eee;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    position: absolute;
                    top: calc(100% + 2px);
                    left: calc(50% - 10px)
                }
            }
            
        }
        .filters {
            padding: 20px 24px;
            background-color: #eee;
            margin-top: 15px;
            display: flex;
            column-gap: 5px;
            .field {
                flex: 1 0 auto;
                button {
                    min-width: 180px;
                    width: 100%;
                    padding: 12px;
                    border-radius: 3px;
                    background-color: #3971c1;
                    font-size: 12px;
                    line-height: 1.33;
                    font-weight: bold;
                    color: #fff
                }
            }
        }
    }
}
</style>