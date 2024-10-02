// 탭을 여는 함수
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // 모든 탭 콘텐츠를 숨기기
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // 모든 탭 링크의 활성 상태 제거
    tablinks = document.getElementsByClassName("tab-menu")[0].getElementsByTagName("a");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 클릭한 탭과 해당하는 콘텐츠 표시
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}




const overlayImages = [
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_none.png',
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_none.png',
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_0.png',
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_1.png',
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_2.png'
];

// 로컬 스토리지에서 이미지 인덱스를 가져오거나, 없으면 빈 객체로 초기화
let imageIndices = JSON.parse(localStorage.getItem('imageIndices')) || {};

function overlayImage(img) {
    const overlay = img.nextElementSibling;
    const imgIdentifier = img.src;

    if (imageIndices[imgIdentifier] === undefined) {
        imageIndices[imgIdentifier] = 0;
    }
    let currentIndex = imageIndices[imgIdentifier];
    currentIndex = (currentIndex + 1) % overlayImages.length;

    overlay.src = overlayImages[currentIndex];
    imageIndices[imgIdentifier] = currentIndex;
    localStorage.setItem('imageIndices', JSON.stringify(imageIndices));
    

    if (currentIndex === 1) {
        img.style.filter = 'grayscale(100%)';
        img.style.opacity = '0.5';
    } else {
        img.style.filter = 'none';
        img.style.opacity = '1';
    }

    overlay.style.display = 'block';
}


// 모든 이미지의 인덱스를 지정된 값으로 설정하는 함수
function setImagesIndex(index) {
    const images = document.querySelectorAll('.image-list img:not(.overlay)');
    images.forEach(img => {
        const overlay = img.nextElementSibling;
        const imgIdentifier = img.src;

        imageIndices[imgIdentifier] = index;
        overlay.src = overlayImages[index];
        overlay.style.display = 'block';
        // 이미지 스타일 변경 로직 추가
        if (index === 1) {
            img.style.filter = 'grayscale(100%)';
            img.style.opacity = '0.5';
        }
        else {
            img.style.filter = 'none';
            img.style.opacity = '1';
        }
    });
    // 업데이트된 인덱스를 로컬 스토리지에 저장
    localStorage.setItem('imageIndices', JSON.stringify(imageIndices));
}



// 페이지 로드 시 저장된 오버레이 상태 복원
function restoreOverlayStates() {
    const images = document.querySelectorAll('.image-list img:not(.overlay)');
    images.forEach(img => {
        const overlay = img.nextElementSibling;
        const imgIdentifier = img.src;
        if (imageIndices[imgIdentifier] !== undefined) {
            let currentIndex = imageIndices[imgIdentifier];
            overlay.src = overlayImages[currentIndex];
            overlay.style.display = 'block';
            
            
            if (currentIndex === 1) {
                img.style.filter = 'grayscale(100%)';
                img.style.opacity = '0.5';
            } else {
                img.style.filter = 'none';
                img.style.opacity = '1';
            }
        }
    });
}

// 페이지 로드 시 오버레이 상태 복원 함수 호출
window.addEventListener('load', restoreOverlayStates);


function searchOperators() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();
    const operatorList = document.getElementById('operatorList');
    const operators = operatorList.getElementsByTagName('li');

    for (let i = 0; i < operators.length; i++) {
        const operatorName = operators[i].getAttribute('data-name').toLowerCase();
        if (operatorName.indexOf(filter) > -1) {
            operators[i].style.display = "";
        } else {
            operators[i].style.display = "none";
        }
    }
}

function dmgcal(){
    
}