<script setup>
import { defineProps, ref } from "vue";
import moment from 'moment'
moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s",
        s  : '1 s',
        ss : '%d s',
        m:  "1 m",
        mm: "%d m",
        h:  "1 h",
        hh: "%d h",
        d:  "1 d",
        dd: "%d d",
        w:  "1 w",
        ww: "%d w",
        M:  "1 m",
        MM: "%d m",
        y:  "1 y",
        yy: "%d y"
    }
});

defineProps({
    story: Object
})
const openCard = ref(false)
const getScoreRate = (score) => {
    if (score > 49) {
        return 'high'
    } else if (score < 26) {
        return 'low'
    } else {
        return 'mid'
    }
}
</script>

<template>
    <div class="card">
        <div class="card-img">
            <img v-if="story.imageUrls" :src="story.imageUrls[0]" alt="" width="70">
        </div>
        <div class="card-body">
            <div>
                <div class="card-body-header">
                    <div class="title">
                        <a :href="story.url" target="_blank">
                            {{story.title}}  
                            <span class="link-icon">
                                <font-awesome-icon icon="fa-solid fa-external-link" />
                            </span>
                        </a>
                    </div>
                    <div class="title-right">
                        <span :class="['score', getScoreRate(story.score)]" >{{story.score}}%</span>
                        <span class="chevron-icon" @click="openCard = !openCard">
                            <font-awesome-icon icon="fa-solid fa-chevron-down" :rotation="openCard ? '180' : null" />
                        </span>
                    </div>
                </div>
                <div class="card-body-content">
                    <div v-if="openCard" class="description">{{story.description}}</div>
                    <div class="footer">
                        <img :src="story.domain_cached_logo_url" alt="img" width="18" height="18">
                        <span class="domain-name">{{story.domain_name}}</span>
                        <span class="date m-0">{{moment(story.publishTime, 'YYYYMMDD').fromNow()}}</span>
                    </div>
                </div>
            </div>            
        </div>
        <div v-if="openCard" class="card-actions">
            <button><font-awesome-icon icon="fa-solid fa-thumbs-up" /> Like</button>
            <button><font-awesome-icon icon="fa-solid fa-thumbs-down" /> Dislike</button>
            <button><font-awesome-icon icon="fa-solid fa-bookmark" /> Bookmark</button>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.card {
    margin-bottom: 7px;
    border-radius: 3px;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    .card-img {
        width: 70px;
        max-height: 100px;
        img {
            height: 100%;
            object-fit: cover;
        }
    }
    .card-body {
        padding: 12px 20px;
        width: calc(100% - 70px);
        .card-body-header {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        .title {
            line-height: 1.38;
            a {
                color: inherit;
                text-decoration: none;
                .link-icon {
                    display: none;
                    margin-left: 4px;
                }
                &:hover {
                    text-decoration: underline;
                    .link-icon {
                        display: inline;
                    }
                }
            }
        }
        .title-right {
            display: flex;
            align-self: flex-start;
        }
        .score {
            display: inline-block;
            border-radius: 5px;
            border: 1px solid;
            padding: 7px 6px 6px;
            margin-right: 20px;
            margin-left: 20px;
            font-size: 14px;
            &.high {
                border-color: #4eb495;
                color: #4eb495
            }
            &.mid {
                border-color: #ffb300;
                color: #ffb300
            }
            &.low {
                border-color: #ef6c00;
                color: #ef6c00
            }
        }
        .chevron-icon {
            cursor: pointer;
        }
    }
    .card-body-content {
        .description {
            font-size: 15px;
            line-height: 1.53;
            color: #292929;
            margin-bottom: 15px;
        }
        .footer {
            display: flex;
            align-items: center;
            img {
                border-radius: 3px;
                border: 1px solid #e0e0e0;
                margin-right: 8px;
            }
            .domain-name, .date {
                font-size: 12px;
                color: #666;
                margin-right: 20px;
                &.m-0 {
                    margin: 0;
                }
            }
        }
    }
        
    }
    .card-actions {
        text-align: right;
        width: 100%;
        box-shadow: 0 -1px 0 0 #e7e7e7;
        padding: 11px 20px 12px;
        button {
            background-color: #fff;
            border: none;
            font-size: 14px;
            color: #292929;
            margin-left: 15px;
            cursor: pointer;
            &:hover {
                color: #3971c1
            }
        }
    }
}
</style>