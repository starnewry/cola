const storeAddress = "서울 서대문구 명지대3길 26";

fetch(`/geocode?query=${encodeURIComponent(storeAddress)}`)
  .then(res => res.json())
  .then(data => {
    console.log("geocode:", data);

    if (!data.addresses || data.addresses.length === 0) {
      alert("좌표를 찾을 수 없습니다.");
      return;
    }

    const lng = parseFloat(data.addresses[0].x);
    const lat = parseFloat(data.addresses[0].y);

    initMap(lat, lng);
  })
  .catch(err => console.error("error:", err));

function initMap(lat, lng) {
  const map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(lat, lng),
    zoom: 18
  });

  new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map
  });
}
