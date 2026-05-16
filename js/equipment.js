document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pdfModal');
    const modalFrame = document.getElementById('pdfFrame');
    const modalTitle = document.getElementById('pdfTitle');
    const loader = document.querySelector('.pdf-loader');
    const closeBtn = document.querySelector('.pdf-close-btn');
    const cards = document.querySelectorAll('.equipment-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const pdfUrl = card.getAttribute('data-pdf');
            const title = card.querySelector('h3').textContent;
            
            if (pdfUrl) {
                // Show loader and set modal info
                loader.classList.remove('hidden');
                
                // Set title: if it ends with "인증서" or "확인서", use as is, otherwise add "지침서"
                let displayTitle = title;
                if (!title.includes('인증서') && !title.includes('확인서') && !title.includes('지명원')) {
                    displayTitle = `${title} 유지관리 지침서`;
                }
                
                modalTitle.textContent = displayTitle;
                
                // Show modal first for animation
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';

                // Set iframe src after a short delay for smoother entry
                setTimeout(() => {
                    modalFrame.src = pdfUrl;
                }, 100);
            }
        });
    });

    // Hide loader when iframe is finished loading
    modalFrame.addEventListener('load', () => {
        loader.classList.add('hidden');
    });

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset src and loader after animation completes
        setTimeout(() => {
            modalFrame.src = '';
            loader.classList.remove('hidden');
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on outside click (only if clicking the backdrop)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});
