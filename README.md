# NCT_API

## 前言

因爲之前沒做前後端分離，所以有點石山了。

不建議fork這個項目，因爲沒什麽用。這個項目是獲取原始數據進行清洗，再回傳的作用。

回傳的api是公開的，請前往[這裏](https://nct.hosinoeiji.workers.dev/api/map-data)

## 食用方法

[NCT_VIEW](https://github.com/NO-CONVERSION-THERAPY/NCT_VIEW)是HosinoNeko製作的一個demo，使用Vue編寫，可直接食用或者作爲參考。

api鏈接在[這裏](https://nct.hosinoeiji.workers.dev/api/map-data)

### 結構

輸出的json數據為以下結構：

```json
{
    "success": true,//json獲取成功
    "last_synced": "2026-04-24T06:57:34.611Z",//上次刷新的時間
    "schoolNum": 960,//已知學校數量（包括志願者收集到的和受害者填寫的表單）
    "avg_age": 13,//平均年齡
    "formNum": 34,//收到的表單數量
    "statistics": [//各個省份已知的學校數量（包括志願者收集到的和受害者填寫的表單）
        {
            "province": "下北澤",//省份名稱
            "count": 114514//數量
        }
    ],
    "statisticsForm": [//各個省份收到的表單數量
        {
            "province": "媽媽省",
            "count": 1919810
        }//其他省份
    ],
    "data": [//主要數據
        {
            "name": "正苗启德青少年特训学校",//機構名稱
            "addr": "汉川市马口镇长湾",//機構地址
            "province": "湖北",//機構所在省份
            "prov": "孝感市",//機構所在城市
            "experience": "具体进去的日期不记得，反正出来是大概是一个月，里面没有电击和太违规的操作，全军事化管理，有体罚，跟教官对抗会被打，里面基本都是精神小伙，和在外面犯事的，还有网瘾，如果是矫正，别人肯定会收的，不过我就待了一个月，具体有没有我不知道，但是别人肯定会收，在里面一定要听教官的话，不要对抗 忍，这样出来的快，他会让你给家长写信，录视频，一定要假装知道错了，这样会让自己好受很多，这样不会太难受",//受害者所遭受的事情
            "HMaster": "段喜明",//機構負責人或者校長
            "scandal": "体罚，小黑屋，恐吓，对监护人和学生两头欺骗，骗钱，",//機構所發生的醜聞等
            "contact": "18707177614",//機構聯係方式
            "inputType": "受害者本人",//表單類型，有“受害者本人”之外，還有一個“受害者代理人”
            "else": "只是没有极端的方式，但是其他的都会有",//受害者對其補充
            "lat": 30.55325,//緯度
            "lng": 113.8285//經度
        }
    ]
}
```

### 獲取

1. Vue

示例程式碼如下（來自NCT_VIEW）：

使用axios
```html
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const dataList = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
    try {
        const response = await axios.get('https://nct.hosinoeiji.workers.dev/api/map-data');
        dataList.value = response.data; // Axios 自動解析 JSON
    } catch (err) {
        error.value = "獲取數據失敗：" + err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="body">
        <h1>NO CONVERSION THERAPY</h1>
        <p v-if="loading">載入中...</p>
        <p v-else-if="error">{{ error }}</p>
        <p>上一次數據更新：{{ dataList.last_synced }}</p>
        <div id="statisc">
            <h2>統計數據</h2>
            <span class="div">受害者平均年齡：{{ dataList.avg_age }}歲</span>
            <span class="div">收到表單數量：{{ dataList.formNum }}</span>
            <span class="div">已標記戒網癮學校：{{ dataList.schoolNum }}</span>
        </div>
        <h2>詳細信息</h2>
        <div id="data" v-for="(item, index) in dataList.data" :key="index">
            <div class="div schoolData">
                <h3>{{ item.name }}</h3>
                <div>
                    <p>校長：{{ item.HMaster }}</p>
                    <p>省份：{{ item.province }}</p>
                    <p>城市：{{ item.prov }}</p>
                    <p>學校地址：{{ item.addr }}</p>
                    <p>受害者經歷：{{ item.experience }}</p>
                    <p>機構醜聞：{{ item.scandal }}</p>
                    <p>機構聯係方式：{{ item.contact }}</p>
                    <p>其他補充：{{ item.else }}</p>
                    <p>表單類型：{{ item.inputType }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
```