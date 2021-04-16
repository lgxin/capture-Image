<template>
    <div class="lg-calendar">
        <input :placeholder="placeholder" type="text" ref="input" class="lg-input" v-model="nowTime" @focus="selectTimeStatus=true">
        <div class="date-show" v-if="selectTimeStatus">
            <ul class="date-header">
                <li>
                    <span @click="leftYear">{{'<<'}}</span>&nbsp;<span @click="leftMonth">{{'<'}}</span>
                </li>
                <li>
                    <span @click="getYearChange()">{{nowYear}}年</span>&nbsp;<span v-if="!monthStatus" @click="()=>{monthStatus = true;dayStatus=false;yearStatus=false;}">{{nowMonth}}月</span></li>
                <li>
                    <span @click="rightMonth">{{'>'}}</span>&nbsp;<span  @click="rightYear">{{'>>'}}</span>
                </li>
            </ul>
            <div class="date-content">
                <ul class="date-list" v-if="dayStatus">
                    <li>日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                </ul>
                <ul class="day-num" v-if="dayStatus">
                    <li :class="{'day-color':item.status,'now-time-status':getNowTime(item),'now-color-time-status':item.day==getDate&&item.nowMonth == nowMonth,'day-activa':item.day==getDate&&item.nowMonth == nowMonth}" v-for="(item, index) in dayShowList" :key="`day-${item.day}-${index}`" @click="getDayChange(item)">{{item.day}}</li>
                </ul>
                <ul class="day-num month-num" v-if="yearStatus">
                    <li :class="{'day-color':item.status}" v-for="item in yearShowList" :key="`year-${item}`" @click="getYearChange(item)">{{item}}年</li>
                </ul>
                <ul class="day-num month-num" v-if="monthStatus">
                    <li :class="{'day-color':item.status}" v-for="item in monthShowList" :key="`day-${item.day}`" @click="getMonthChange(item)">{{item.day}}月</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
$border-input-color: #dcdee2
.lg-calendar
    width: 300px
    height: 300px
    padding: 20px
    border: 1px solid #ccc
    font-size: 14px
    user-select: none
    ul
        list-style: none
        margin: 0
        padding: 0
    .date-show
        width: 200px
        margin-top:10px
        border: 1px solid $border-input-color
        border-radius: 4px
        // padding:0  10px
        >.date-header
            display: flex
            line-height: 2
            justify-content: space-between
            padding: 0 10px
            border-bottom: 1px solid $border-input-color
            >li
                cursor: pointer
            >li:nth-child(2)
                >span
                    &:hover
                        color: #2d8cf0
            >li:nth-child(1),
            >li:nth-child(3)
                color: #c5c8ce
                >span
                    &:hover
                        color: #2d8cf0
        >.date-content
            padding: 10px
            >.date-list
                display: flex
                margin-bottom: 10px
                flex-wrap: wrap
                >li
                    text-align: center
                    color: #c5c8ce
                    width: calc( 100% / 7  )
            >.day-num 
                display: flex
                flex-wrap: wrap
                >li
                    text-align: center
                    height: 25px
                    line-height: 25px
                    cursor: pointer
                    width: calc( 100% / 7  )
                    border-radius: 3px
                    transition: all .2s ease-in-out
                    margin: 3px 0
                    &:hover
                        background: #e1f0fe
                >li.day-color
                    color: #c5c8ce
                >li.day-activa
                    color: #fff
                    background: #2d8cf0
                >li.now-time-status
                    position: relative
                    &::before
                        content: ' '
                        display: inline-block
                        position: absolute
                        width: 5px
                        height: 5px
                        border-radius: 50%
                        background: #2d8cf0
                        right: 2px
                        top: 2px
                    &.now-color-time-status
                        &::before
                            background:#fff
            >.month-num
                >li
                    padding: 10px 0
                    width: calc( 100% / 3  )
    >.lg-input
        height: 25px 
        line-height: 1.5 
        padding: 4px 7px 
        font-size: 14px 
        border: 1px solid $border-input-color 
        border-radius: 4px 
        color: #515a6e 
        background-color: #fff 
        background-image: none 
        position: relative 
        cursor: text 
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out 
        &:focus
            outline: 0
            box-shadow: 0 0 0 2px rgb(45 140 240 / 20%)
</style>

<script>
export default {
    name: 'calendar',
    props: {
        placeholder: {
            type: String
        },
        value: {
            type: Date
        }
    },
    watch: {
        value:{
            handler(date) {
                this.dateChange();
                date = new Date(date);
                const nowYear = date.getFullYear(); // 现在处于的年份
                const getMonth = date.getMonth() + 1; // 现在处于的月份
                const getDay = date.getDay() // 0-6 0是周末 现在处于的星期
                const getDate = date.getDate() // 1-31 当前日
                this.$nextTick(()=>{
                    this.getDayChange({day:getDate,nowYear,nowMonth:getMonth})
                })
            },
            immediate: true,
            deep: true
        }
    },
    data(){
        return {
            nowYear: '', // 当前年
            nowMonth: '', // 当前月
            getDate: '', // 当前日
            getDay: '', // 当前天 
            monthFront: '', // 前一个月
            monthBack: '', // 后一个月
            yearFront: '', // 上一年
            yearBack: '', // 下一年
            dayNowNum: '',
            dayFrontNum: '',
            daybackNum: '',
            dayShowList: [],
            yearShowList: [],
            monthShowList: [],
            dayStatus: true,
            yearStatus: false,
            monthStatus: false,
            nowTime: '',
            selectTimeStatus: false
        }
    },
    methods: {
        getNowTime({nowMonth,day,nowYear}){
            const date = new Date();
            const getYear = date.getFullYear(); // 现在处于的年份
            const getMonth = date.getMonth() + 1; // 现在处于的月份
            const getDate = date.getDate() // 1-31 当前日
            if (nowMonth==getMonth&&getYear==nowYear&&getDate==day) {
                return true;
            }
            return
        },
        mGetDate(year, month){
            const d = new Date(year, month, 0);
            return d.getDate();
        },
        dayShowNum(dayNum, num, month,year){ //31 4  31 30 29 28
            const day = [];
            for(let i = 0; i < num; i++){
                day.push({
                    day:dayNum - i,
                    nowYear: year||this.nowYear,
                    nowMonth: month||this.nowMonth,
                    status: true
                })
            }
            return day;
        },
        dayNow(count, status, month,year) {
            const day = [];
             for(let i = 1; i <= count; i++){
                if (this.getDate) {

                }
                day.push({
                    day: i,
                    nowYear: year||this.nowYear,
                    nowMonth: month||this.nowMonth,
                    status
                });
            }
            return day
        },
        dateChange(time = new Date()){
            const date = new Date(time);
            if (this.selectTimeStatus) {
                this.$refs.input.focus();
            }
            const nowYear = date.getFullYear(); // 现在处于的年份
            const getMonth = date.getMonth() + 1; // 现在处于的月份
            const getDay = date.getDay() // 0-6 0是周末 现在处于的星期
            const getDate = date.getDate() // 1-31 当前日
            const firstDay = (new Date(`${nowYear}-${getMonth}-1`)).getDay()
            this.nowYear = nowYear;
            this.nowMonth = getMonth;
            this.getDate = getDate;
            this.getDay = getDay;
            this.monthFront = getMonth == 1 ? 12 : getMonth - 1;
            this.monthBack = getMonth == 12 ? 1 : getMonth + 1;
            // 在一月份的前一个月 月份和年份的变化
            this.yearFront = getMonth == 1 ? this.nowYear - 1 : this.nowYear;
            this.yearBack = getMonth == 12 ? this.nowYear + 1 : this.nowYear;
            this.dayNowNum = this.mGetDate(nowYear,getMonth); // 现在的天数
            this.dayFrontNum = this.mGetDate(nowYear,getMonth - 1); // 上个月天数
            this.daybackNum = this.mGetDate(nowYear,getMonth + 1); // 下个月天数
            const dayFrontNumList = this.dayShowNum(this.dayFrontNum,firstDay,this.monthFront, this.yearFront).reverse();
            const dayNowNumList = this.dayNow(this.dayNowNum, false, this.getMonth, this.nowYear);
            const daybackNumList = this.dayNow(6*7 - dayFrontNumList.length - dayNowNumList.length, true,this.monthBack, this.yearBack);
            this.monthShowList = this.dayNow(12, false);
            
            this.dayShowList = [
                ...dayFrontNumList,
                ...dayNowNumList,
                ...daybackNumList
            ];
        },
        getMonthChange({day:nowMonth,nowYear}){
            const time = new Date(`${this.nowYear}-${nowMonth<9? '0' + nowMonth:nowMonth}-1`);
            this.dateChange(time);
            this.dayStatus = true;
            this.yearStatus = false;
            this.monthStatus = false;
        },
        getYearChange(item) {
            if (item) {
                this.nowYear = item;
                this.yearStatus = false;
                this.dayStatus = false;
                this.monthStatus = true;
                return;
            }
            const arr = [];
            arr[0] = this.nowYear - 1;
            for(let i = 0; i < 9; i++){
                arr.push(this.nowYear + i)
            }
            this.yearShowList = arr;
            this.yearStatus = true;
            this.dayStatus = false;
            this.monthStatus = false;
        },
        getDayChange({day,nowYear,nowMonth}){
            this.getDay = day;
            this.nowYear = nowYear;
            this.nowMonth = nowMonth;
            const time = `${this.nowYear}-${nowMonth<9? '0' + nowMonth:nowMonth}-${this.getDay>9?this.getDay:'0'+this.getDay}`;
            this.nowTime = time;
            this.dateChange(new Date(time));
            this.selectTimeStatus = false;
            this.$refs.input.blur();
            
            this.$emit('on-change', time)
        },
        leftMonth() {
            this.nowMonth--;
            if (this.nowMonth<=0) {
                this.nowYear--;
                this.nowMonth = 12
            }
            const time = new Date(`${this.nowYear}-${this.nowMonth<9? '0' + this.nowMonth:this.nowMonth}-1`);
            this.dateChange(time);
        },
        rightMonth() {
            this.nowMonth++;
            if (this.nowMonth>=12) {
                this.nowYear++;
                this.nowMonth = 1
            }
            const time = new Date(`${this.nowYear}-${this.nowMonth<9? '0' + this.nowMonth:this.nowMonth}-1`);
            this.dateChange(time);
        },
        leftYear(){
            this.nowYear--;
            this.getYearChange();
            const time = new Date(`${this.nowYear}-${this.nowMonth<9? '0' + this.nowMonth:this.nowMonth}-1`);
            this.dateChange(time);
        },
        rightYear(){
            this.nowYear++;
            this.getYearChange();
            const time = new Date(`${this.nowYear}-${this.nowMonth<9? '0' + this.nowMonth:this.nowMonth}-1`);
            this.dateChange(time);
        }
    },
    mounted () {
        this.dateChange();
    }
}
</script>

