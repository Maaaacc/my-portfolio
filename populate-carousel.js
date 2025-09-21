const ProjectImages = {
    DigitalLibrary: {
        desktop: [
            { src: "images/LibraryManagementSystem/Desktop/FP-HomePage.png", alt: "Home Page" },
            { src: "images/LibraryManagementSystem/Desktop/FP-BrowseBooks.png", alt: "Browse Books" },
            { src: "images/LibraryManagementSystem/Desktop/FP-BookDetails.png", alt: "Book Details" },
            { src: "images/LibraryManagementSystem/Desktop/FP-BorrowedBooks.png", alt: "Borrowed Books" },
            { src: "images/LibraryManagementSystem/Desktop/FP-Dashboard.png", alt: "Dashboard" },
            { src: "images/LibraryManagementSystem/Desktop/FP-ManageBooks.png", alt: "Manage Books" },
            { src: "images/LibraryManagementSystem/Desktop/FP-ManageUsers.png", alt: "Manage Users" },
            { src: "images/LibraryManagementSystem/Desktop/FP-UserDetails.png", alt: "User Details" }
        ],
        // mobile: [
        //     { src: "images/LibraryManagementSystem/Mobile/FP-HomePage.png", alt: "Home Page" },
        //     { src: "images/LibraryManagementSystem/Mobile/FP-BrowseBooks.png", alt: "Browse Books" },
        //     { src: "images/LibraryManagementSystem/Mobile/FP-BookDetails.png", alt: "Book Details" },
        //     { src: "images/LibraryManagementSystem/Mobile/FP-BorrowedBooks.png", alt: "Borrowed Books" },
        //     { src: "images/LibraryManagementSystem/Mobile/FP-Dashboard.png", alt: "Dashboard" },
        //     { src: "images/LibraryManagementSystem/Mobile/FP-ManageBooks.png", alt: "Manage Books" },
        //     { src: "images/LibraryManagementSystem/Mobile/FP-ManageUsers.png", alt: "Manage Users" },
        //     { src: "images/LibraryManagementSystem/Mobile/FP-UserDetails.png", alt: "User Details" }
        // ]
    },
    BahayNgAlumni: {
        desktop: [
            { src: "images/BahayNgAlumni/Desktop/HomePage.png", alt: "Landing Page" },
            { src: "images/BahayNgAlumni/Desktop/Booking.png", alt: "Booking Page" },
            { src: "images/BahayNgAlumni/Desktop/TracerForm.png", alt: "Alumni Tracer Form" },
            { src: "images/BahayNgAlumni/Desktop/WebsiteContent.png", alt: "News Page" },
            { src: "images/BahayNgAlumni/Desktop/AllBookings.png", alt: "All Bookings Page" },
            { src: "images/BahayNgAlumni/Desktop/BookingDashboard.png", alt: "Booking Dashboard" },
            { src: "images/BahayNgAlumni/Desktop/TracerDashboard.png", alt: "Alumni Tracer Dashboard" },
            { src: "images/BahayNgAlumni/Desktop/WebsiteCMS.png", alt: "Website CMS" }

        ],
        // mobile: [
        //     { src: "images/BahayNgAlumni/Mobile-Landing.png", alt: "Landing Page" },
        //     { src: "images/BahayNgAlumni/Mobile-Booking.png", alt: "Booking Page" },
        //     { src: "images/BahayNgAlumni/Mobile-TracerForm.png", alt: "Alumni Tracer Form" },
        //     { src: "images/BahayNgAlumni/Mobile-AllBookings.png", alt: "All Bookings Page" },
        //     { src: "images/BahayNgAlumni/Mobile-BookingDashboard.png", alt: "Booking Dashboard" },
        //     { src: "images/BahayNgAlumni/Mobile-TracerDashboard.png", alt: "Alumni Tracer Dashboard" }
        // ]
    },
    PersonalNotes: {
        desktop: [
            { src: "images/PersonalNotes/Desktop/HomePage.png", alt: "Home Page" },
            { src: "images/PersonalNotes/Desktop/MyNotes.png", alt: "My Notes" },
            { src: "images/PersonalNotes/Desktop/AddNote.png", alt: "Add Note" },
            { src: "images/PersonalNotes/Desktop/EditNote.png", alt: "Edit Note" },
            { src: "images/PersonalNotes/Desktop/DeleteNote.png", alt: "Delete Note" }


        ]
    }
};

let lightboxInstance;

function populateCarousel(project, view, carouselId) {
    const carousel = document.querySelector(`#${carouselId}`);
    const carouselInner = carousel.querySelector(".carousel-inner");
    const carouselIndicators = carousel.querySelector(".carousel-indicators");

    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";

    ProjectImages[project][view].forEach((img, index) => {
        // Item
        const item = document.createElement("div");
        item.className = "carousel-item" + (index === 0 ? " active" : "");
        item.innerHTML = `
            <a href="${img.src}" class="glightbox" data-gallery="${project}-${view}">
                <img src="${img.src}" class="d-block w-100 rounded" alt="${img.alt}">
            </a>`;
        carouselInner.appendChild(item);

        // Indicator
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", `#${carouselId}`);
        indicator.setAttribute("data-bs-slide-to", index);
        if (index === 0) indicator.className = "active";
        carouselIndicators.appendChild(indicator);
    });

    // Reset lightbox
    if (lightboxInstance) lightboxInstance.destroy();
    lightboxInstance = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        draggable: true,
    });
}

// Initial load for each modal
document.addEventListener("DOMContentLoaded", () => {
    // Digital Library default desktop
    populateCarousel("DigitalLibrary", "desktop", "carouselLibrary");

    // BahayNgAlumni default desktop
    populateCarousel("BahayNgAlumni", "desktop", "carouselBahay");

    // Personal Notes default desktop
    populateCarousel("PersonalNotes", "desktop", "carouselNotes");
});

// Toggle buttons - DigitalLibrary
document.getElementById("btnDesktop2").addEventListener("click", () => {
    populateCarousel("DigitalLibrary", "desktop", "carouselLibrary");
    document.getElementById("btnDesktop2").classList.add("active");
    document.getElementById("btnMobile2").classList.remove("active");
});
// document.getElementById("btnMobile2").addEventListener("click", () => {
//     populateCarousel("DigitalLibrary", "mobile", "carouselLibrary");
//     document.getElementById("btnMobile2").classList.add("active");
//     document.getElementById("btnDesktop2").classList.remove("active");
// });

// Toggle buttons - BahayNgAlumni
document.getElementById("btnDesktop1").addEventListener("click", () => {
    populateCarousel("BahayNgAlumni", "desktop", "carouselBahay");
    document.getElementById("btnDesktop1").classList.add("active");
    document.getElementById("btnMobile1").classList.remove("active");
});
// document.getElementById("btnMobile1").addEventListener("click", () => {
//     populateCarousel("BahayNgAlumni", "mobile", "carouselBahay");
//     document.getElementById("btnMobile1").classList.add("active");
//     document.getElementById("btnDesktop1").classList.remove("active");
// });

// Toggle buttons - BahayNgAlumni
document.getElementById("btnDesktop3").addEventListener("click", () => {
    populateCarousel("PersonalNotes", "desktop", "carouselNotes");
    document.getElementById("btnDesktop3").classList.add("active");
    document.getElementById("btnMobile3").classList.remove("active");
});