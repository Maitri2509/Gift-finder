// =====================================================
// GIFTFINDER - MAIN JAVASCRIPT
// =====================================================

console.log("GiftFinder JavaScript loaded!");


// =====================================================
// GIFT DATABASE
// =====================================================

const gifts = [

    {
        name: "Personalized Photo Frame",
        emoji: "🖼️",
        price: 399,
        tags: [
            "birthday",
            "friend",
            "bestfriend",
            "photography",
            "creative",
            "personalized"
        ]
    },

    {
        name: "Personalized Mug",
        emoji: "☕",
        price: 299,
        tags: [
            "birthday",
            "friend",
            "bestfriend",
            "personalized",
            "cute"
        ]
    },

    {
        name: "Cute Teddy Bear",
        emoji: "🧸",
        price: 699,
        tags: [
            "valentines",
            "girlfriend",
            "boyfriend",
            "cute",
            "loved"
        ]
    },

    {
        name: "Wireless Earbuds",
        emoji: "🎧",
        price: 1499,
        tags: [
            "technology",
            "music",
            "gaming",
            "useful"
        ]
    },

    {
        name: "Smart Watch",
        emoji: "⌚",
        price: 2499,
        tags: [
            "technology",
            "sports",
            "useful",
            "impressed"
        ]
    },

    {
        name: "Bluetooth Speaker",
        emoji: "🔊",
        price: 1999,
        tags: [
            "technology",
            "music",
            "gaming",
            "happy"
        ]
    },

    {
        name: "Gaming Headset",
        emoji: "🎮",
        price: 1599,
        tags: [
            "gaming",
            "technology",
            "gamer",
            "useful"
        ]
    },

    {
        name: "Romantic Gift Hamper",
        emoji: "💝",
        price: 1799,
        tags: [
            "anniversary",
            "valentines",
            "partner",
            "spouse",
            "loved"
        ]
    },

    {
        name: "Custom Name Bracelet",
        emoji: "💎",
        price: 899,
        tags: [
            "fashion",
            "girlfriend",
            "boyfriend",
            "personalized",
            "loved"
        ]
    },

    {
        name: "Programming Book",
        emoji: "📚",
        price: 699,
        tags: [
            "books",
            "intellectual",
            "graduation",
            "friend"
        ]
    },

    {
        name: "Travel Backpack",
        emoji: "🎒",
        price: 1899,
        tags: [
            "travel",
            "adventurous",
            "useful",
            "friend"
        ]
    },

    {
        name: "Handmade Scrapbook",
        emoji: "📖",
        price: 799,
        tags: [
            "creative",
            "personalized",
            "bestfriend",
            "emotional",
            "handmade"
        ]
    },

    {
        name: "Fitness Gift Kit",
        emoji: "🏋️",
        price: 1299,
        tags: [
            "sports",
            "useful",
            "adventurous"
        ]
    },

    {
        name: "Travel Journal",
        emoji: "✈️",
        price: 449,
        tags: [
            "travel",
            "creative",
            "books",
            "adventurous"
        ]
    },

    {
        name: "Premium Perfume",
        emoji: "🌸",
        price: 2299,
        tags: [
            "luxury",
            "fashion",
            "romantic",
            "special"
        ]
    },

    {
        name: "Art Supply Kit",
        emoji: "🎨",
        price: 899,
        tags: [
            "art",
            "creative",
            "handmade"
        ]
    },

    {
        name: "Indoor Plant",
        emoji: "🌱",
        price: 499,
        tags: [
            "plants",
            "nature",
            "simple"
        ]
    },

    {
        name: "Photography Album",
        emoji: "📷",
        price: 599,
        tags: [
            "photography",
            "creative",
            "personalized"
        ]
    },

    {
        name: "Cute Desk Lamp",
        emoji: "💡",
        price: 799,
        tags: [
            "cute",
            "simple",
            "useful"
        ]
    }

];


// =====================================================
// FORM VALIDATION
// =====================================================

function validateForm() {

    const nameInput =
        document.getElementById("name");

    const locationInput =
        document.getElementById("location");

    const nameError =
        document.getElementById("nameError");

    const locationError =
        document.getElementById("locationError");


    const name =
        nameInput.value.trim();

    const location =
        locationInput.value.trim();


    // -------------------------------------------------
    // NAME
    // -------------------------------------------------

    if (name === "") {

        nameInput.style.border =
            "2px solid red";

        nameError.textContent =
            "❌ Please enter your name.";

        nameError.style.color =
            "red";

        nameInput.focus();

        return false;
    }


    if (!/^[A-Za-z ]+$/.test(name)) {

        nameInput.style.border =
            "2px solid red";

        nameError.textContent =
            "❌ Name should contain letters only.";

        nameError.style.color =
            "red";

        nameInput.focus();

        return false;
    }


    nameInput.style.border =
        "2px solid green";

    nameError.textContent =
        "✓ Valid name";

    nameError.style.color =
        "green";


    // -------------------------------------------------
    // LOCATION
    // -------------------------------------------------

    if (location === "") {

        locationInput.style.border =
            "2px solid red";

        locationError.textContent =
            "❌ Please enter your location.";

        locationError.style.color =
            "red";

        locationInput.focus();

        return false;
    }


    locationInput.style.border =
        "2px solid green";

    locationError.textContent =
        "✓ Location added";

    locationError.style.color =
        "green";


    // -------------------------------------------------
    // OCCASION
    // -------------------------------------------------

    const occasion =
        document.querySelector(
            'input[name="occasion"]:checked'
        );


    if (!occasion) {

        alert(
            "🎉 Please select an occasion."
        );

        return false;
    }


    // -------------------------------------------------
    // RELATION
    // -------------------------------------------------

    const relation =
        document.querySelector(
            'input[name="relation"]:checked'
        );


    if (!relation) {

        alert(
            "❤️ Please select who you are gifting."
        );

        return false;
    }


    // -------------------------------------------------
    // AGE
    // -------------------------------------------------

    const age =
        document.getElementById("age").value;


    if (age === "") {

        alert(
            "🎂 Please select an age group."
        );

        return false;
    }


    // -------------------------------------------------
    // BUDGET
    // -------------------------------------------------

    const budget =
        document.getElementById("budget").value;


    if (budget === "") {

        alert(
            "💰 Please select your budget."
        );

        return false;
    }


    // -------------------------------------------------
    // PERSONALITY
    // -------------------------------------------------

    const personality =
        document.querySelector(
            'input[name="personality"]:checked'
        );


    if (!personality) {

        alert(
            "🎭 Please select their personality."
        );

        return false;
    }


    return true;
}


// =====================================================
// FORM SUBMIT
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const form =
            document.getElementById("giftForm");


        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            function (event) {


                // VERY IMPORTANT
                // Prevent normal page refresh

                event.preventDefault();


                console.log(
                    "Submit button clicked!"
                );


                // Run validation

                const valid =
                    validateForm();


                if (!valid) {

                    return;

                }


                // ------------------------------------------------
                // GET ALL DATA
                // ------------------------------------------------

                const name =
                    document
                    .getElementById("name")
                    .value
                    .trim();


                const location =
                    document
                    .getElementById("location")
                    .value
                    .trim();


                const occasion =
                    document.querySelector(
                        'input[name="occasion"]:checked'
                    ).value;


                const relation =
                    document.querySelector(
                        'input[name="relation"]:checked'
                    ).value;


                const age =
                    document
                    .getElementById("age")
                    .value;


                const budget =
                    document
                    .getElementById("budget")
                    .value;


                const personality =
                    document.querySelector(
                        'input[name="personality"]:checked'
                    ).value;


                const moodElement =
                    document.querySelector(
                        'input[name="mood"]:checked'
                    );


                const giftTypeElement =
                    document.querySelector(
                        'input[name="giftType"]:checked'
                    );


                const timeElement =
                    document.querySelector(
                        'input[name="time"]:checked'
                    );


                const description =
                    document
                    .getElementById("description")
                    .value
                    .trim();


                // ------------------------------------------------
                // INTERESTS
                // ------------------------------------------------

                const interests = [];


                document
                    .querySelectorAll(
                        'input[name="interest"]:checked'
                    )
                    .forEach(
                        function (item) {

                            interests.push(
                                item.value
                            );

                        }
                    );


                // ------------------------------------------------
                // CREATE USER OBJECT
                // ------------------------------------------------

                const userData = {

                    name: name,

                    location: location,

                    occasion: occasion,

                    relation: relation,

                    age: age,

                    budget: budget,

                    personality: personality,

                    mood:
                        moodElement
                        ? moodElement.value
                        : "",

                    giftType:
                        giftTypeElement
                        ? giftTypeElement.value
                        : "",

                    time:
                        timeElement
                        ? timeElement.value
                        : "",

                    interests: interests,

                    description: description

                };


                // ------------------------------------------------
                // SAVE DATA
                // ------------------------------------------------

                localStorage.setItem(
                    "giftFinderData",
                    JSON.stringify(userData)
                );


                // ------------------------------------------------
                // REDIRECT TO GIFTS PAGE
                // ------------------------------------------------

                window.location.href =
                    "gifts.html";

            }
        );

    }
);


// =====================================================
// GIFT RESULTS PAGE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const giftContainer =
            document.getElementById(
                "giftContainer"
            );


        // If this isn't gifts.html,
        // do nothing.

        if (!giftContainer) {
            return;
        }


        const savedData =
            localStorage.getItem(
                "giftFinderData"
            );


        if (!savedData) {

            giftContainer.innerHTML = `

                <div style="
                    text-align:center;
                    padding:40px;
                ">

                    <h2>
                        🎁 No Gift Search Found
                    </h2>

                    <p>
                        Please fill the form first.
                    </p>

                    <a
                        href="form.html"
                        class="main-button">

                        Find My Gift

                    </a>

                </div>

            `;

            return;
        }


        const user =
            JSON.parse(savedData);


        // ------------------------------------------------
        // CALCULATE SCORE
        // ------------------------------------------------

        const scoredGifts =
            gifts.map(
                function (gift) {


                    let score = 0;


                    // Occasion

                    if (
                        gift.tags.includes(
                            user.occasion
                        )
                    ) {

                        score += 5;

                    }


                    // Relation

                    if (
                        gift.tags.includes(
                            user.relation
                        )
                    ) {

                        score += 4;

                    }


                    // Personality

                    if (
                        gift.tags.includes(
                            user.personality
                        )
                    ) {

                        score += 4;

                    }


                    // Mood

                    if (
                        gift.tags.includes(
                            user.mood
                        )
                    ) {

                        score += 3;

                    }


                    // Gift type

                    if (
                        gift.tags.includes(
                            user.giftType
                        )
                    ) {

                        score += 3;

                    }


                    // Interests

                    user.interests.forEach(
                        function (interest) {

                            if (
                                gift.tags.includes(
                                    interest
                                )
                            ) {

                                score += 3;

                            }

                        }
                    );


                    return {
                        ...gift,
                        score: score
                    };

                }
            );


        // Sort by highest match

        scoredGifts.sort(
            function (a, b) {

                return b.score - a.score;

            }
        );


        // Get top 8

        const selectedGifts =
            scoredGifts.slice(0, 8);


        // ------------------------------------------------
        // TITLE
        // ------------------------------------------------

        const resultTitle =
            document.getElementById(
                "resultTitle"
            );


        if (resultTitle) {

            resultTitle.textContent =
                "Perfect Gifts For " +
                user.name +
                " 🎁";

        }


        // ------------------------------------------------
        // CREATE CARDS
        // ------------------------------------------------

        selectedGifts.forEach(
            function (gift) {


                const card =
                    document.createElement(
                        "div"
                    );


                card.style.background =
                    "white";

                card.style.padding =
                    "25px";

                card.style.borderRadius =
                    "20px";

                card.style.textAlign =
                    "center";

                card.style.boxShadow =
                    "0 5px 20px rgba(0,0,0,0.12)";


                card.innerHTML = `

                    <div style="
                        font-size:65px;
                        margin-bottom:15px;
                    ">
                        ${gift.emoji}
                    </div>


                    <h2>
                        ${gift.name}
                    </h2>


                    <p>
                        🎯 Matched with your
                        preferences
                    </p>


                    <h3 style="
                        font-size:22px;
                    ">
                        ₹${gift.price}
                    </h3>


                    <button
                        type="button"
                        class="choose-gift-btn">

                        💝 Choose This Gift

                    </button>

                `;


                // Choose button

                const chooseButton =
                    card.querySelector(
                        ".choose-gift-btn"
                    );


                chooseButton.style.border =
                    "none";

                chooseButton.style.padding =
                    "12px 20px";

                chooseButton.style.borderRadius =
                    "25px";

                chooseButton.style.cursor =
                    "pointer";


                chooseButton.addEventListener(
                    "click",
                    function () {

                        alert(
                            "🎁 Great choice!\n\n" +
                            gift.name +
                            "\n\nGift selected successfully!"
                        );

                    }
                );


                giftContainer.appendChild(
                    card
                );

            }
        );

    }
);