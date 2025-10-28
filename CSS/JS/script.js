document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carrusel-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentSlideIndex = 0;
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Inicializar el primer slide como activo
    slides[0].classList.add('active');

    // Función para mover el carrusel
    const moveToSlide = (track, currentSlide, targetSlide) => {
        // Calcula la cantidad a desplazar (negativo para mover a la izquierda)
        const amountToMove = targetSlide.dataset.index * slideWidth;
        track.style.transform = 'translateX(-' + amountToMove + 'px)';
        
        // Actualiza la clase 'active' para la animación de información
        currentSlide.classList.remove('active');
        targetSlide.classList.add('active');
        
        currentSlideIndex = parseInt(targetSlide.dataset.index);
    };

    // Lógica para el botón 'Siguiente'
    nextButton.addEventListener('click', e => {
        let nextIndex = (currentSlideIndex + 1) % slides.length;
        const currentSlide = slides[currentSlideIndex];
        const nextSlide = slides[nextIndex];
        
        moveToSlide(track, currentSlide, nextSlide);
    });

    // Lógica para el botón 'Anterior'
    prevButton.addEventListener('click', e => {
        let prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length; // Asegura que sea un índice positivo
        const currentSlide = slides[currentSlideIndex];
        const prevSlide = slides[prevIndex];
        
        moveToSlide(track, currentSlide, prevSlide);
    });
    
    // Asegurar que el carrusel se recalcule si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        const amountToMove = currentSlideIndex * newSlideWidth;
        track.style.transform = 'translateX(-' + amountToMove + 'px)';
    });
});