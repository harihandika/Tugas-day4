let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
]

function renderBlog() {

    const myProjectBody = document.getElementById('blog-detail');

    const data = JSON.parse(localStorage.getItem(decodeURIComponent(window.location.search.substring(1))))

    console.table(data)



    for (let i = 0; i < data.length; i++) {

        const SDV = new Date(data[i].date.startDate)
        const EDV = new Date(data[i].date.endDate)
        const duration = getProjectDuration(EDV, SDV)
        console.table(data[i].date.startDate)
        console.log(duration)

        myProjectBody.innerHTML = `
            <div id="blog-detail">
        <!--BD = Blog Detail-->
        <div class="bd-title">
            <p>${data[i].title}</p>
        </div>
        <!--IDC = Image, Duration, Categories-->
        <div class="bd-idc">
            <div class="idc-left">
                <img src="${data[i].image}" alt="Blog Image">
            </div>
            <div class="idc-right">
                <p>Duration</p>
                <div class="bd-duration">
                    <div style="padding-left: 2px;">
                        <i class="fa-solid fa-calendar-days"></i>
                        <p>${SDV.getDate()} ${month[SDV.getMonth()]} ${SDV.getFullYear()} - ${EDV.getDate()} ${month[EDV.getMonth()]} ${EDV.getFullYear()}</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-clock"></i>
                        <p>${duration}</p>
                    </div>
                </div>
                <div class="bd-tech">
                    <p>Technologies</p>
                    <div class="tech-body">
                    ${(data[i].icons.html === true) ? '<div class="tech-html"><i class="fa-brands fa-html5"></i><p>HTML</p></div>' : ''}
                    ${(data[i].icons.css === true) ? '<div class="tech-css"><i class="fa-brands fa-css3-alt"></i><p>CSS</p></div>' : ''}
                    ${(data[i].icons.nodeJs === true) ? '<div class="tech-node"><i class="fa-brands fa-node-js"></i><p>nodeJs</p></div>' : ''}
                    ${(data[i].icons.reactJs === true) ? '<div class="tech-react"><i class="fa-brands fa-react"></i><p>reactJs</p></div>' : ''}
                    </div>
                </div>
            </div>
        </div>

        <div class="bd-content">
            <p>
                ${data[i].content}
            </p>
        </div>
    </div>
            `
    }
}

function getProjectDuration(endDate, startDate) {

    const data = JSON.parse(localStorage.getItem(decodeURIComponent(window.location.search.substring(1))))

    for (let i = 0; i < data.length; i++) {

        startDate = new Date(data[i].date.startDate)
        endDate = new Date(data[i].date.endDate)

        const distance = endDate - startDate

        const miliseconds = 1000
        const secondInMinute = 60
        const minuteInHour = 60
        const secondInHour = secondInMinute * minuteInHour // 3600
        const hourInDay = 23
        const dayInMonth = 30

        let dayDistance = distance / (miliseconds * secondInHour * hourInDay)

        if (dayDistance >= 30) {
            return `${Math.floor(dayDistance / dayInMonth)}` + ` Month`
        } else {
            return `${Math.floor(dayDistance)}` + ' day'
        }
    }

}

renderBlog()