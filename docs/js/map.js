ymaps.ready (init);

var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: 'Привет, чувак!',
        balloonContent: [
            'Чего ',
            'изволите ',
            'сударь?'
        ]
    },
    {
        latitude: 59.94,
        longitude: 30.25,
        hintContent: 'Привет, чувак!',
        balloonContent: [
            'Чего ',
            'изволите ',
            'государь?'
        ]
    },
    {
        latitude: 59.93,
        longitude: 30.34,
        hintContent: 'Привет, чувак!',
        balloonContent: [
            'Чего ',
            'изволите ',
            'халоп?'
        ]
    }
];

function init () {
    var myMap = new ymaps.Map ('myMap', {
        center: [59.94, 30.32],
        zoom: 10,
        controls: ['zoomControl'],
        //Чтобы не было зума карты при скролле. Если оставим пустой массив [] то никакого поведения по умолчанию у карты не будет. Также мы отменим возможность сдвига карты при зажатой левой кнопкой мыши.
        // Чтобы всеже не лишаться этой возможности пропишем в массив 'drag'
        behaviors: ['drag']
    });

    placemarks.forEach(function(obj) {
        //методом forEach() мы пройдемся по каждому объекту массива placemarks и выполним для каждого объекта функцию
        var myPlacemark = new ymaps.Placemark ([obj.latitude, obj.longitude], {
            hintContent: obj.hintContent,
            balloonContent: obj.balloonContent.join('') //join() - метод склеивания массива в строку
        }, 
        {   
            iconLayout: 'default#image',
            iconImageHref: './svg/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
        });
        myMap.geoObjects.add(myPlacemark);

    });

    var clusterer = new ymaps.Clusterer ({

    });

    myMap.geoObjects.add(clusterer);

    // let myPlacemark1 = new ymaps.Placemark ([59.97, 30.31], {
    //     hintContent: 'Это хинт',
    //     balloonContent: [
    //         'Это ',
    //         'балун!'
    //     ].join('')
    // }, 
    // {   
    //     iconLayout: 'default#image',
    //     iconImageHref: './svg/icons/map-marker.svg',
    //     iconImageSize: [46, 57],
    //     iconImageOffset: [-23, -57]
    // });

    // let myPlacemark2 = new ymaps.Placemark ([59.95, 30.31], {
    //     hintContent: 'Это хинт',
    //     balloonContent: 'Это балун!'
    // }, 
    // {   
    //     iconLayout: 'default#image',
    //     iconImageHref: './svg/icons/map-marker.svg',
    //     iconImageSize: [46, 57],
    //     iconImageOffset: [-23, -57]
    // });

    // let myPlacemark3 = new ymaps.Placemark ([59.99, 30.31], {
    //     hintContent: 'Это хинт',
    //     balloonContent: 'Это балун!'
    // }, 
    // {   
    //     iconLayout: 'default#image',
    //     iconImageHref: './svg/icons/map-marker.svg',
    //     iconImageSize: [46, 57],
    //     iconImageOffset: [-23, -57]
    // });

    // myMap.geoObjects.add(myPlacemark1);
    // myMap.geoObjects.add(myPlacemark2); 
    // myMap.geoObjects.add(myPlacemark3);  
};