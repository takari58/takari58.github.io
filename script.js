const button = document.getElementById("getLocationBtn");

const latText = document.getElementById("lat");
const lonText = document.getElementById("lon");
const elevationText = document.getElementById("elevation");

button.addEventListener("click", () => {

    if (!navigator.geolocation) {

        alert("GPSが利用できません");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            latText.textContent = lat;
            lonText.textContent = lon;

            // 国土地理院 標高API
            const url =
                `https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=${lon}&lat=${lat}&outtype=JSON`;

            try {

                const response = await fetch(url);
                const data = await response.json();

                if (data.elevation !== undefined) {

                    elevationText.textContent = data.elevation;

                } else {

                    elevationText.textContent = "取得失敗";

                }

            } catch (error) {

                elevationText.textContent = "エラー";

            }

        },

        (error) => {

            alert("位置情報取得に失敗しました");

        }

    );

});
