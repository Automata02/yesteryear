const DEFAULT_SEARCH_TERM = 'cats';
const API_URL_BASE = 'https://api.artic.edu/api/v1/artworks/search';

let isNuclearActive = false;
let allArtworks = [];
let currentPage = 1;
let hasMoreArtworks = true;

function fetchArtworks(searchTerm = 'cats', page = 1) {
    const apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&page=${page}&limit=10`;

    if (!hasMoreArtworks) {
        return;
    }

    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function (response) {
            if (response.data && response.data.length > 0) {
                allArtworks = allArtworks.concat(response.data);
                displayFetchedArtworks(response.data);
                currentPage += 1;
            } else {
                hasMoreArtworks = false;
                $('#loadMoreButton').hide();
            }
        },
        error: function (error) {
            console.error("Error fetching artworks:", error);
            $('#nuclearOptionDiv').append('<p>Error fetching more artworks.</p>');
        }
    });
}

function displayFetchedArtworks(artworks) {
    let html = '';
    for (let artwork of artworks) {
        html += `<li><a href="#" data-api-link="${artwork.api_link}">${artwork.title}</a></li>`;
    }
    $('#artworkList').append(html);

    $('#artworkList a').click(function (event) {
        event.preventDefault();
        const apiLink = $(this).data('api-link');
        fetchDetailsFromApiLink(apiLink);
    });
}

function fetchDetailsFromApiLink(apiLink) {
    $.ajax({
        url: apiLink,
        type: 'GET',
        success: function (response) {
            displayArtworkDetails(response);
            $('#artworkListView').hide();
            $('#artworkDetailView').show();
        },
        error: function (error) {
            console.error("Error fetching details:", error);
            $('#artworkDetailContent').html('<p>Error fetching details.</p>');
        }
    });
}

function displayArtworkDetails(data) {
    const artwork = data.data;
    const iiifBaseUrl = data.config.iiif_url;
    const resizedImageUrl = `${iiifBaseUrl}/${artwork.image_id}/full/300,/0/default.jpg`;

    let html = `
        <div class="artwork-detail">
            <h2>${artwork.title}</h2>
            <img src="${resizedImageUrl}" alt="${artwork.thumbnail.alt_text}">
            <p><strong>Artist:</strong> ${artwork.artist_display}</p>
            <p><strong>Date:</strong> ${artwork.date_display}</p>
            <p><strong>Place of Origin:</strong> ${artwork.place_of_origin}</p>
            <p><strong>Medium:</strong> ${artwork.medium_display}</p>
            ${artwork.description ? `<p><strong>Description:</strong> ${artwork.description}</p>` : ''}
            <p><strong>Dimensions:</strong> ${artwork.dimensions}</p>
        </div>
    `;
    $('#artworkDetailContent').html(html);
}

$(document).ready(function () {
    $('#linkNuclear').click(function () {
        toggleNuclearView();
    });

    $('#loadMoreButton').click(function () {
        fetchArtworks(DEFAULT_SEARCH_TERM, currentPage);
    });

    $('#backToList').click(function () {
        $('#artworkListView').show();
        $('#artworkDetailView').hide();
    });

    fetchArtworks(DEFAULT_SEARCH_TERM, currentPage);
});

function toggleNuclearView() {
    if (!isNuclearActive) {
        $('.grid').hide();
        $('#nuclearOptionDiv').show();
        fetchArtworks();
        $('#linkNuclear').text('Maybe Not');
    } else {
        $('.grid').show();
        $('#nuclearOptionDiv').hide();
        $('#linkNuclear').text('Nuclear Option');
    }
    isNuclearActive = !isNuclearActive;
}
