<template>
    <section class="calendar">
        <!-- <calenWrite ref="calen" /> -->
        <header-view></header-view>
        <div class="container">
            <div>  </div>
            <h2 class="main-box">
                <button class="changeDate" @click="calendarData(-1)">&lt;</button>
                {{ year }}년 {{ month }}월
                <button class="changeDate" @click="calendarData(1)">&gt;</button>
            </h2>
            <table class="date-box">
                <thead>
                    <th v-for="day in days" :key="day" class="days">{{ day }}</th>
                </thead>
                <tbody>
                    <tr v-for="(date, idx) in dates" :key="idx">
                        <td v-for="(day, secondIdx) in date" :key="secondIdx" :class="{
                            'last-dates': idx === 0 && day >= lastMonthStart,
                            'next-dates': dates.length - 1 === idx && nextMonthStart > day,
                            'today': day === today && month === currentMonth && year === currentYear && idx != 0
                        }" @click="changePopState(year,month,day)" style="cursor:pointer">

                            {{ day }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <PopUp v-if="popState" @close="changePopState()" v-bind:modalData="dateData"></PopUp>
    </section>

</template>
  
<script>
import PopUp from './PopUp.vue';
import HeaderView from './HeaderView.vue';
export default {
    components: { HeaderView, PopUp},
    data() {
        return {
            popState : false,
            days: ['일','월','화','수','목','금','토',],
            dates: [],
            currentYear: 0,
            currentMonth: 0,
            year: 0,
            month: 0,
            lastMonthStart: 0,
            nextMonthStart: 0,
            today: 0,
            dateData : []
        };
    },
    created() {
        const date = new Date();
        this.currentYear = date.getFullYear(); // 현재 년, 월
        this.currentMonth = date.getMonth() + 1;
        this.year = this.currentYear;
        this.month = this.currentMonth;
        this.today = date.getDate(); // 오늘 날짜
        this.calendarData();
    },
    methods: {
        changePopState(year,month,day){
            this.popState = !this.popState;  //팝업창 열고 닫기
            this.dateData = [year,month,day];
        },

        calendarData(arg) { // 인자 추가
            if (arg < 0) { // -1 = 지난 달 이동
                this.month -= 1;
            } else if (arg === 1) { // 1 = 다음 달 이동
                this.month += 1;
            }
            if (this.month === 0) { // 작년 12월
                this.year -= 1;
                this.month = 12;
            } else if (this.month > 12) { // 내년 1월
                this.year += 1;
                this.month = 1;
            }
            const [
                monthFirstDay,
                monthLastDate,
                lastMonthLastDate,
            ] = this.getFirstDayLastDate(this.year, this.month);
            this.dates = this.getMonthOfDays(
                monthFirstDay,
                monthLastDate,
                lastMonthLastDate,
            );
        },
        getFirstDayLastDate(year, month) {
            const firstDay = new Date(year, month - 1, 1).getDay(); // 이번 달 시작 요일
            const lastDate = new Date(year, month, 0).getDate(); // 이번 달 마지막 날짜
            let lastYear = year;
            let lastMonth = month - 1;
            if (month === 1) {
                lastMonth = 12;
                lastYear -= 1;
            }
            const prevLastDate = new Date(lastYear, lastMonth, 0).getDate(); // 지난 달 마지막 날짜
            return [firstDay, lastDate, prevLastDate];
        },
        getMonthOfDays(
            monthFirstDay,
            monthLastDate,
            prevMonthLastDate,
        ) {
            let day = 1;
            let prevDay = (prevMonthLastDate - monthFirstDay) + 1;
            const dates = [];
            let weekOfDays = [];
            while (day <= monthLastDate) {
                if (day === 1) {
                    // 1일이 어느 요일인지에 따라 테이블에 그리기 위한 지난 셀의 날짜들을 구함
                    for (let j = 0; j < monthFirstDay; j += 1) {
                        if (j === 0) this.lastMonthStart = prevDay; // 지난 달에서 제일 작은 날짜
                        weekOfDays.push(prevDay);
                        prevDay += 1;
                    }
                }
                weekOfDays.push(day);
                if (weekOfDays.length === 7) {
                    // 일주일 채우면
                    dates.push(weekOfDays);
                    weekOfDays = []; // 초기화
                }
                day += 1;
            }
            const len = weekOfDays.length;
            if (len > 0 && len < 7) {
                for (let k = 1; k <= 7 - len; k += 1) {
                    weekOfDays.push(k);
                }
            }
            if (weekOfDays.length > 0) dates.push(weekOfDays); // 남은 날짜 추가
            this.nextMonthStart = weekOfDays[0]; // 이번 달 마지막 주에서 제일 작은 날짜
            return dates;
        },
    },
};
</script>

<style scoped>
.popup-view{
    opacity: 0;
    display: none;
    visibility: hidden;
  }
  .active{
    opacity: 1;
    display: block;
    visibility: visible;
  }
.calendar{
    width: 1700px;
    margin: 0 auto;
}
.container{
    width: 1500px;
}
.main-box{
    margin-bottom: 30px;
    text-align: center;
    font-size: 2.8em;
}
.changeDate{
    border-radius: 100px;
    margin-left: 20px;
    margin-right: 20px;
    width: 50px;
}
.date-box{
    width: 1300px;
    height: 650px;
    font-size: 2.5em;
    text-align: center;
}
.last-dates,.next-dates{
    color: lightgrey;
    pointer-events: none;
}

.today{
    color: palevioletred;
    font-weight: bold;
}

</style>