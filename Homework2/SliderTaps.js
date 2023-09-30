var imageInfo = {
    "Image 1": "a bunch of flowers that are in the grass by Eugene Golovesov (@eugene_golovesov)",
    "Image 2": "a close up of a bunch of white flowers by Eugene Golovesov (@eugene_golovesov)",
    "Image 3": "a blurry photo of a path in a forest by Vitalii Mazur (@vitalymazur)",
    "Image 4": "a blurry photo of a bunch of leaves by Eugene Golovesov (@eugene_golovesov)",
    "Image 5": "a bunch of flowers that are in the grass by Eugene Golovesov (@eugene_golovesov)",
    "Image 6": "untitled by Eugene Golovesov (@eugene_golovesov)"
};

$('.sliderImage').on('click', function () {
    var altText = $(this).attr('alt');
    var info = imageInfo[altText];

    if (info) {
        $('#modalInfoContent').text(info);
        $('#infoModal').modal('show');
    }
});

$(document).ready(function () {
    $('#linkA').click(function () {
        $('#contentA').slideToggle();
    });
    $('#linkB').click(function () {
        $('#contentB').slideToggle();
    });
    $('#linkC').click(function () {
        if ($('.images').css('visibility') === 'visible') {
            $('.images').css('visibility', 'hidden');
        } else {
            $('.images').css('visibility', 'visible');
        }
    });
    $('#linkD').click(function () {
        $('#contentD').toggleClass('visible');
    });
});

const budget = {
    items: {},
    getTotal: function () {
        let total = 0;
        $('#contentD tbody tr').each(function () {
            const productName = $(this).find('td:nth-child(1)').text().trim();
            const priceCell = $(this).find('td:nth-child(2)');
            const price = parseFloat(priceCell.text().replace('$', '').trim());

            if (!isNaN(price)) {
                budget.items[productName] = price;
                total += price;
            }
        });
        return total;
    }
}

$(document).ready(function () {
    $('#sendMail').prop('disabled', true);

    $('#calculateTotal').click(function () {
        let total = budget.getTotal();
        alert(`Total is: $${total}`);
        $('#sendMail').prop('disabled', false);
    });

    $('#sendMail').click(function () {
        alert('Email sent!');
    });
});
