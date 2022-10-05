<script setup>
import {ref, defineProps, defineEmits, watch} from 'vue'
import { onClickOutside } from '@vueuse/core'
const props = defineProps({
    label: String,
    options: Array,
    defaultValue: Object
})
const emit = defineEmits(['updateValue'])
const value = ref(props.defaultValue)

watch(value, (val) => {
    openSelect.value = false
    emit('updateValue', val)
})
const openSelect = ref(false)

const filterTarget = ref(null)
onClickOutside(filterTarget, () => {
    if (openSelect.value) {
        openSelect.value = false
    }
})
</script>

<template>
    <div class="select" ref="filterTarget">
        <div class="selected">{{value.text}}</div>
        <div class="label">{{props.label}}</div>
        <div :class="['chevron-icon', {up: openSelect}]" @click="openSelect = !openSelect">
            <font-awesome-icon icon="fa-solid fa-chevron-down" :rotation="openSelect ? '180' : null" />
        </div>
        <div v-show="openSelect" class="options">
            <div class="options-label">{{props.label}}:</div>
            <div v-for="option in options" :key="option" class="options-item">
                <input :id="option.text" type="checkbox" :true-value="option" :false-value="props.defaultValue" v-model='value'>
                <label :for="option.text">{{option.text}}</label>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .select {
        min-width: 180px;
        width: 100%;
        border-radius: 3px;
        background-color: #fff;
        padding: 5px 10px 4px;
        position: relative;
        clear: both;
        .label {
            color: #666;
            letter-spacing: 0.5px;
            line-height: 1.6;
            font-size: 10px;
            text-transform: uppercase;
        }
        .selected {
            font-size: 13px;
            color: #292929;
            font-weight: bold;
        }
        .chevron-icon {
            padding: 11px 10px;
            float: right;
            margin-right: -11px;
            margin-top: -37px;
            border-radius: 3px;
            cursor: pointer;
            &.up {
                background-color: #f7f7f7;
            }
        }
        .options {
            position: absolute;
            width: inherit;
            top: 100%;
            left: 0;
            box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.2);
            margin-top: 6px;
            z-index: 11;
            background-color: inherit;
            padding: 20px;
            .options-label {
                font-size: 13px;
                font-weight: bold;
                color: #292929;
                margin-bottom: 15px;
                text-transform: uppercase;
            }
            .options-item {
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                &:last-of-type {
                    margin-bottom: 0;
                }
                input {
                    margin-right: 10px;
                    height: 18px;
                    width: 16px;
                }
                label {
                    font-size: 14px;
                    color: #292929;
                    
                }
            }
        }
    }
</style>