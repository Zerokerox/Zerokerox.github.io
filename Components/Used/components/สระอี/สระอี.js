class ThaiSaraELesson extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.wordsData = [
      {
        word: "ตี",
        spell: "ตอ อี ตี",
        image:
          "https://th.bing.com/th/id/OIP.G7vdSfHe7lDW2oYfI20uMgHaFJ?w=235&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "/Audio/สระไทย/ขา.m4a",
      },
      {
        word: "ผี",
        spell: "ผอ อี ผี",
        image:
          "https://th.bing.com/th/id/OIP.HB-ToQiRT7JvtDPRqheAFQAAAA?w=172&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ฝี",
        spell: "ฝอ อี ฝี",
        image:
          "https://th.bing.com/th/id/OIP.zvX7rC2FmlSTNP0LPVi9KQHaE7?w=261&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ชี",
        spell: "ชอ อี ชี",
        image:
          "https://th.bing.com/th/id/OIP.keBGI-G_USjZpM1Be6-lMwHaHU?w=172&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "รี",
        spell: "รอ อี รี",
        image:
          "https://th.bing.com/th/id/OIP.iySco9QXmhl-U74O2ZDonAHaGV?w=191&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ปี",
        spell: "ปอ อี ปี",
        image:
          "https://th.bing.com/th/id/OIP.NMIEmp7QhcEWun5ey7ZzYQHaHa?w=159&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ทีวี",
        spell: "ทอ อี ที วอ อี วี",
        image:
          "data:image/webp;base64,UklGRu4TAABXRUJQVlA4IOITAACQZACdASoaAbQAPp1Gnkulo6mnpbIroTATiU2GxvsDReq+CGEaCBESDhYHyYxKo6nHy/JrGVtif731n/pjfOea/9rvWY9N/++9KPqpd6Q/dD0bq0HX+4j/j9zP/h+OM5y535b34/nz/L7D2ee8HX7WPjHnn86CZYNSb596+GdBLZ/t+w6j5vJQ2mySU+2P0z4J0iQKExnSXzW42BQhBSXEFcoyxcf0SVTHJb7ieS55IbwLag9C51JZrL6+TAt6qRMzjTXs5XJXX2PEGE/0UVPGfaRsdaU13gsPkuhaDUqcp3pk2OWvaLMKP2XVLQ2YXe105duB13KwyrzfQ6n4qUjbxtO306OE/OGtTX8y01S/PsgCVknppYWAbFoMu6kryzYtFfqOAk1oCEWpI4Tcgzh7uBKNJSAqaBFvs9aUlrLvpP+zJaVOFAJKsmXDKMlnXkbm+FJMutWLdFklB7vWtHfN0Zo1pptHG6j//HAGZxm8R9pLXxLRBHteiNEoqeq4XPL+gKTjJ0ymaVs3W83CHquWaHOjmu6BQKystZW2UPzmOkYEsFX7Vz4cWNlHAKVsaX6vmxFzgURi1/9bITFuvL64zNQa3FHBHO9LZgh0oRHDrD58U8PkfLPBANQBNAAE/ceNiUmSt0BCXLbr//mLmlzMN3l8Sry/xbJ/TM68RKcrfu6ZoFBqkZk6+uzo2BzCdyjXO8diBKWf/7TH1Ry41UaRHuQ4hBe9b5bSJ4LAPW9MIeX1bsyDmxPEoNg2U8jbVGD4dzGm+hso31BvkfGeOu0WjvWG4XJE8N/+KFz1/P2idhEjoEvZJyalQCKhkhbt4HOtXscpz9fjdBoy0lP7ROL6BSSj19540AqjTIKCnKvuv0KJwM3JluzZUwf9Q3b3UN8chibLn08KHykLJF5nRJVjnv8QLXk0p65eFGRVOtVVuNedAEDKS1upliPUGOXN0yCkEq2dLKTvLJoIdSp3nahfIo2YS+PwdXZGW4bI2btzk4WtLsARpTZzUtm7Lg3LQock+3lbOmL1U4ShDUi23fECtqAiuOKrYe5VQyHRv1ZnM3vQelT/H3RFDEDXVAAA/vAxGx+B8p3s79y64sGqQUv7RP4X/5OTcYwr0P3fxfX0AUtMZGS/16lrLQlwSdkbqcnFCZnSvv0lX80I5U4lRWbQuWW3D8vDy74OWCWunXvVLW6eNM6H2Jgs61Ydeom5hOqz2Ji++ED+qLjmvw7w2nxlSYGjTJ52jZVowIQd73qL0O++ZE0TK1gLHiE6+bp77LKSccxbXZSpyV5eqwf5AVCxzmh7w0bsC0B8zOwtXU9KyHU2i+49D+xkWQB9R2Kx7WG7Tn7ChxU34SUeX8nLdMez0FnjCizzME7hG3lrohU0DfzqCxM+qOfaXicTAQaJQMNtTcmXberLILZShnKRMh0mQdzgyS0rM43qyUW3uxyO4SWYynZh5x/YvhhKr5j+zEjPhIBPF2bML+Snkzn/rNzl9XgX9MKK1lEIsLIuiv/qY03gvtvkgD1qCN39RMzK8XlytWUvHRiAZ5awz6qxIEP3XntXOj8/hXD5awVcM7RyypfAvGNp197M1uxeZArif6h7Xap8gt3ydkKeTdd0iW/tK2J1Z1Nu6gHimds5fXNoFGlFi4S6KwzI8QgYw1foDj98S3SEIrHSpNTC5MRtS6+XLyZw+F+/S3tj0Erig3Hrw62OX2RNbP0rZTJHlVyFwa+g5LibOqtSBUpC0VJ/UqhyXaepqFQTYRIivbI/HIakMu13UyQL3XHYP5HZCDWUo0HCGTxwBaP+LcZXiudOTnnHw076HnclprMFTMJo+AF5Ya+r5Tgm/ubZ5Dh2TJfnL5wJHnqc3R2OZJF2BOEYeuNON697kGuiBIADUSzfWaErgXpSYdkSl9m6Jqlv5jnvKodUIXQxsjxvgc/+MDTPms94aWaXygpsIsg9RRcqleuCCpSzjKBrA21CzdX8wvQVUAQs3vlKknbcVg4HdgLRSqIt5ljHcGw230SlevUjGDn+GkiuowB0IsAkz/YohQa1Vd5rQLTqQ4EBoXsLpApDe7/BouKd17dz1ZW9cTZX7WO0rd6RZ9ahuEbBP5Iptvl5TMhRV+2xaU3eLWTW51mhpTQWJ1Wut6ZI5aReo52Y8xrQO8zGUU8QzZwpamkJfhRZD7ebqDK1xZjvEq0Mntp4sgtLb4P1U4NNkz9EfyksRaQLorPRMb9Lm+K3Q0k6slHH1Y9AuQ7S9OKYSbxRQDr01Tnv8XV4GfGecj2tsgvPCk5KtimWDhk1RXli6Ph7cfU7AsyyjmERNksUGa1CX1HLo88zgfHcSkL9vya8fNYKiZvp4g0Cca+1AMebTcPaslYvgJsf4p+WA1b0/fEtWVayD4x6agJhINZMANhFExJ/4ENb/lWDp/wnTO14jIymrnrcseBivilM1egxGpGzfzZ+KHfajpQvAZNr+uN1oZYPy1dhPpA6N2ork5tylhyjtmTZho14QBfMfGuwT0ZXQi1lOOpQeaQRLOkCBiqGrbAl3hiWHtB05o/scwZHjtXDyvc40gRCtuBDJPq8/HPGmBxR07Ib6NAZdQRxUfOwd/G2o4cizD8+dQbAKebyzdjXv9z+GCe8b+SvHsM7VRyBVnCpoDFVyX0+WU8HwYviHFHKf5wO+8GCLmio+GD2z7y7JXmzIu0K8bXx7d0s1UV6AUuGCLGgSwe9fWI0UQbxcUdNW+g3VIojnpZQ92C71NXiz+cobkZ3KSSVXL2QF6Cxth4hRVfXezLr4QrauneTO+Lf1puKGCJ2ISEzSlko0WaGmIyqOApSzXk7SFKzp9lmuanUGVP3I1bHmh8jTR0er2QjBZRdLI/pKeLqvI+c/d5Rs6DPwT5jVuqPbdfZGXSPrs9UAJLTGmibe4ovYE45J7b0+QlK/usNc+s0IOEQcAl7SIX3BsK4UT1aK8OgpaJsGKPb8vQEuA7txvSto+3SmW7yxcVJQhGsxONm/cbrYk1xGGR/3SM2GvAq/dS8pHW5MlbEMfAHptb5rL3toeeO4Pnnf6nwBo5flR93LP4vVhEGub5Ni7b3UpgZUzG/U4WIerrKw+q1uzuxXVEwEtvjhspRLMtMUdjE0Aojuor/iXgY9azs1IZeOPZF4OINOY3+AovrEdPhlTJe+Qs+mZNPqslMfMYC/Qhs/ANl/aNfUlQ+tX9R03yOFgAPfyaCH3UhBMDll2UTTloiXOPBnL08F3TIspbyilzu78XVsuypfi5Hn/Mxtc/Y+/ai8Btnqj5wV5sPGH9HqmXjB22fS/WkPok4evLFjVL6BztCo0tl/ZCnYROowkHKBFgx2lIue4y3wq3Kvq+dS8yTxwCzZcxnYtVTkA7LZie87BubDwWVyB6KhUEcg+3AEdduQ4akXqYrT2AZAe9rnA3XafJ3zm1yVGrsAcPaWJ8q6KxZ7jicSFvKSP+tLQ80Va6RIiM5Wshy56XtYFoAvaB8ArLSVqM0EwwxqGpr1nErwQFYpOMfi643oYDqo4kgtasJlxyRmyjHqYy8rZhgPlUyVh/v2Dz+ylBgcY9GvAnivzh/x5+1hNrZXxt4qEGD5y4cTtUACa8/6QC7jqD7G8QKY5ECXhsFr67/2kWkeYUSbPg/fOfl4ETGEklgMLrAnTrLO6EigDr8N5C4gEI5tk88jt289BgiC2iuggKiiiL/iGnin0YK3fBRLDeMrjEY65FvG5aGrk6ywVO1SZRy0tH4WYSeuG+8alaKL0bDgPgAFLs9ded3LsImZz/HDkPd2RnPC5dqS6kq7QNholAeBP5sjfh4SnhQYI0gq4vSTGSY38bdp3m7JVOPI3nyOrVuBR6zzcLpDKmUjLnwY2AEutmgxxR6haO+19DLNf1gu128Dwx/BrWcPm6452EJi//1DcWrDe/js/M/QWJTuqfY4Umhavgzefnx7Tb6YOkT+G1nfwJrbR0dTq3ZC0PXZyZ3UNMAi1u3rOeQa59AmazYriI9dXvGzmbIdIT7Xc/u+KvzvFwbxYpYlAht5bR+zPxGZYbzXG5PNwwkqn7Ykj6W3/rqChwEVr3hfnEj1dzkpfGjp7fklSVxTP+frqx1eiYK4zzYRimCYXL8uW3vfK+WYQGbnRHAuOkx7KLCvzWlSYfF7jxlf3LknowtKeQkNBbufjzSIZOB5fT0Y6YqljMwgU9Bap2jjm6P1N8+E00Nfn6Hr22DCwOPm5elhP1j2sf3KmHZViYTpvvJU1+vpTuSEbCBR/Y6Q0EiAp8iKFHa4rS7CV5zsOj2CXIsycx+aktFQW6YQYWOOo7UioEtVO0v+cHg8Hj4TCTLNavefpX7nbAs+ns0qyxP7xmzyBMYahqFPJwx/9U/zT9jK44GOCe35/0jkwjlLRn7HgwV0FOWdQKXiAN5ZyvUg/q4YvlUJvoO1L+Z6ykRsrG8sJV7ayTsXE0G3Yp623dWt/7i5y9oYqrGwIucXQ0VP2T8VBgQ7iSOip8pHBKkqTwtmvV7yRJRwn8aoEBDBWDl6Iixmpjt61VzHCyvK4OGrSlBn9XP9Lx6O30ca3aX9dr13XChpvZ8YkZNSwBKotyleCGx6HJougMmaiJkCPuYInN98wdey3zsx/v36rvxuHURwJBJ56eSHzllyOHRZPOC2E6gXVKhyEiamzNlo1Z0P38dWH8yaZBaaz7tguY2EIIDqciKngr39ON65lrLplTuN1LVPSh4xwNbhrUHZ+4rHsXHww8iSrJbAqXLe2wcWu//AxmcMmf8McOCPG6JK1Us3tnfIPr5/YIHtyZIwpRoENGLWTph68SL5+7GOmIidl2Qn6/orsePV2Zrlp5Cs3k6gW2zPyAsQTBayZnHBpACfo+GaKpDSE/7I8GkLUCAfSmVU+paVI7f/O3tzQ0sXuBv1J/TQzCr+dd1Xb37wo6Z6B7TbdJDsXikcmc4GAXAFJwv0769hNw1PQSf6v7zwvmkF721ePaCsOhebOTs0dx0PrBbCP/rUuXvhVXfCguPw9bPhOyu+I05vglxoNIv+nt4tIKIHzjl2b59dSHIDxGiS+ssLz1vHJKrZWvCLH12uIzxaErat8Me/JNSrbaArgg48gFBqonC2a1IMrno9ULP38JCLIYfiKBzvXCG4c3PInEMNod/8VzDB2drvyKAxCZ7/tAkNu4k4tZaPpAFx/Es4NrxZZSA9hyJOM1bViS795D4x8Uu780wl4VA27Q70ggK4cKna9R/LE8vbu6GgmKFhkJw1LPzk1GR181eo8WXwOJlCJmHE/T3EL89mAJwaU1poX/4aitFGAHvYCSak+JlwyTTuADeP0+9K1sncUkTHDIwraOcwZN5iVRtU6fv303rWoawMFC8Sk4zD/f4iW27Qt43P3E/EPYfVXN5yJWGOygk6BWygpv8T3yhz4ZMUy7qF+3NVF6reiNOI+QpssxFoFAIPcy+jIhFWYNtpsH1CNLm12f04Xcy4S1HLrnQ8zFWEiJKWHyHQHVsnehNUr7pVHOKBMouTU7vtwBTUTZZBYyte/LnVSGNHoqwWDU2BNZPdf/rNyaKZp/9N7ySct6u/HfKPtZg0Hb6OWm8l+MxbkjU4NjKdp3J52R42Gje3NRkWoFHiod06b/5Wzwcjrz+4sxEFVKmsuvHpQgBDlNlPhQhOCl9dBOBhdlX8iAZoptBkkxGY5y5AOt02Y+BlHujz8RH0nDqGNkRVVjXhcIKj0UPS/n5MgPCToCheL+aePPxk7GpUNnJP4F/46r6SrMAcT5gGL7qpqSuyIf4LPvno0qT5evG/aXM2rN2EtIH589KeaYi+k4VeiWv1Z/ibVKH+5DPtOZMJZXUsILKg83UOFyYel19czIf0cMeykJADxnxYGex9rWwMNGaVK6NGY/WRQXlXoLmeqd/muTsw7ZKCK9xfH5hVllv2qyXYNqnaC4XHyRjlGDIQR95SuwfxIiqnOqkgpHaZ1Dd+Em7sgqb70/ey3Y7Wkmz7Iedvyq218ffL0boTafAZzdDLOvrOOeK9r//E1n1Y5mMHdX8gevdNq1QG4mm0CWm+V8Qhv1+llArbOhpsgIwdLgizgKZ4HHIp6no7HOxdsh6A36+dMl7O0T95igL9Mt4V1ZX0SUTUB9MQs+kcwAcIHHijKtiZF8VzG/XpxOmiRGgWsUPu4m4trUIwa3Z9DQL9Y4jcZQ17TqdOusv91AsyHPL3VyYWJiRaxjxcIGjjKZV8+HZgqvat/c+Idgmikh3MlYgn5yQXgsn/k+S032OEm/5TB6Ufh9DyUhqMxhUnhJYKxmZynrxNpNlDEglDLBgjhULfuVsESgZ3Q2az9fq7LSf0O5xvL9iGlviLDcHay26GAL4sWg9m1dh2IYWIgHyLT8clw9WkU41MeAGf3/sB5eBEAFyjdQq/vEdz7TEk2F+WFiHYd2BbY6XNYrJuvyBJAtYJsOm5Cz5kKi2VX/aUlD5f3fkpQ1uBKt8TBTBHy25Vr4fgHRGMpJhFpsxihDrtyCjVwguBUbUJ4+IIDhQS6US51aLurDRZx59RiTHBUC2Py0IUp85vh/J6alr1eY9bf2HqBDO3m0t/sARJn+qFNgm3UJEMcTE5TjCtkgDlJqMGpW50jC0vrBR3RsguO4O7/KdYS31JBW99JUjUW9ZMGRkgX5x4Xon6pp1rh+JL3NtyA/ZRBeCuTLtVaPy1pAn7E03Y4zjxSbnhre8fAkzLA7kWofePjkIPKCIPSIW0Z6xWWsoaQ2pzOeOFyoD+znm9QyfpYIhsNy8O/CQDbhWf5dNjgCY/q/lsgomql1rxsAAAA==",
        audio: "",
      },
      {
        word: "นาที",
        spell: "นอ อา นา ทอ อี ที",
        image:
          "https://th.bing.com/th/id/OIP.g5lpeTOi52GeweKD3b9tPQHaHp?w=212&h=220&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
    ];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  playAudio(src) {
    if (!src) return;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(src);

    this.currentAudio.play().catch((error) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", error);
    });
  }

  render() {
    const headerAudio = this.getAttribute("header-audio") || "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: none;
          min-width: 0;
          margin: 0;
          box-sizing: border-box;
        }

        * {
          box-sizing: border-box;
        }

        .book-container {
          width: 100%;
          min-width: 0;
          background: #ffffff;
          border: 2px solid #8ba3c7;
          border-radius: 12px;
          padding: clamp(12px, 3vw, 20px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .header-box {
          text-align: center;
          margin-bottom: 20px;
        }

        .badge {
          display: inline-block;
          background: #f7ce92;
          color: #5d4037;
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          font-weight: bold;
          padding: 6px 24px;
          border-radius: 20px;
          margin-bottom: 12px;
        }

        .sub-title {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #455a64;
          margin: 4px 0;
        }

        .main-example {
          font-size: clamp(1.1rem, 3vw, 1.3rem);
          font-weight: bold;
          color: #c62828;
          margin-top: 8px;
        }

        .highlight {
          color: #2b5282;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(8px, 2vw, 12px);
          border: 2px solid #6b82a8;
          padding: clamp(8px, 2vw, 10px);
          border-radius: 8px;
          background: #fafafa;
        }

        .card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-width: 0;
          min-height: 100px;
          background: #ffffff;
          border: 1px solid #d0d7de;
          border-radius: 8px;
          padding: clamp(10px, 2vw, 14px);
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .card:active {
          transform: scale(0.97);
          background: #eef3f8;
        }

        .card-text {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: bold;
          color: #c62828;
        }

        /* Image */
        .card-image {
          width: clamp(55px, 12vw, 85px);
          height: clamp(55px, 12vw, 85px);
          object-fit: contain;
          flex-shrink: 0;
          border-radius: 8px;
        }

        .audio-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.3rem;
          padding: 4px;
        }

        .audio-btn:focus-visible,
        .card:focus-visible {
          outline: 3px solid #2b5282;
          outline-offset: 3px;
        }

        @media (max-width: 360px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="book-container">
        <div class="header-box">
          <div class="badge">สระ - ี</div>

          <div class="sub-title">
            อ่านว่า <span class="highlight">สระอี</span>
          </div>

          <div class="main-example">
            สี
            <span style="color:#333;font-weight:normal;font-size:0.9em">
              อ่านว่า สอ อี สี
            </span>
            <button
              class="audio-btn"
              id="play-header"
              aria-label="เล่นเสียงคำว่า สี"
              ${headerAudio ? "" : "disabled"}
            >🔊</button>
          </div>
        </div>

        <div class="grid-container">
          ${this.wordsData
            .map(
              (item, index) => `
            <button
              class="card"
              type="button"
              data-index="${index}"
              aria-label="เล่นเสียง ${item.word}"
              ${item.audio ? "" : "disabled"}
            >
              <span class="card-text">${item.word}</span>

              <img
                class="card-image"
                src="${item.image}"
                alt="${item.word}"
                loading="lazy"
              />
            </button>
          `,
            )
            .join("")}
        </div>
      </div>
    `;

    this.headerAudio = headerAudio;
  }

  bindEvents() {
    this.shadowRoot
      .querySelector("#play-header")
      .addEventListener("click", () => {
        this.playAudio(this.headerAudio);
      });

    this.shadowRoot.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.dataset.index);
        this.playAudio(this.wordsData[index].audio);
      });
    });
  }

  disconnectedCallback() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }
}

customElements.define("thai-sara-e-lesson", ThaiSaraELesson);
