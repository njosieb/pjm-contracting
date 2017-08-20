// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import 'lightbox';

$(() => {
  const jWindow = $(window);

  let sidebarVisible = false;

  const body = $('body');

  $('#menu-reveal').click(function() {
    sidebarVisible = !sidebarVisible;
    if (sidebarVisible) {
      body.addClass('menuOpen');
    } else {
      body.removeClass('menuOpen');
    }
  });

  $('.section-link').click(function() {
    body.removeClass('menuOpen');
    sidebarVisible = false;
  });

  if (window.location.pathname === '/' && jWindow.width() >= 600) {
    const topSection = $('#top-splash')

    jWindow.on('scroll', function() {
      topSection.find('.parallax-image').css('transform', `translate3d(0, ${jWindow.scrollTop() * -.3}px, 0)`)
    })
  }

  lightbox.option({
    'wrapAround': true
  })


  // Modal functionality starts here

  $('.portfolio-container .project-title-text, .portfolio-container .image-container').click(function(){
    var id = $(this).parents('.project').attr('id')
    $('#modal-' + id).show()
    $('body').addClass('modal-open')
  })

  $('.modal-overlay').click(function(){
    $('.modal-container').hide()
    $('body').removeClass('modal-open')
  })


  // Filtering portfolio
  const filterableTags = ['residential', 'bath', 'kitchen', 'basement', 'exterior', 'deck']

  $(document).ready(function() {
    if (window.location.pathname === '/portfolio/') {
      if (filterableTags.some(tag => tag === window.location.hash.substring(1))) {
        filterProjects(window.location.hash.substring(1))
      } else {
        window.location.hash = ''
        $('#all-projects').addClass('active-tag')
      }
    }
  })

  $('#all-projects').click(function() {
    window.location.hash = ''
    $('.project').show()
  })

  $('.filter-tag, .project-filter.clickable').click(function(event) {
    event.preventDefault()
    const filteringTag = $(this).data('tagname')
    window.location.hash = `#${filteringTag}`
    filterProjects($(this).data('tagname'))
  })

  const filterProjects = function (clicked) {
    $('.project').hide()
    $('.active-tag').removeClass('active-tag')
    $(`.project-filter[data-tagname="${clicked}"]`).addClass('active-tag')
    $('.project').filter(`.${clicked}`).show()
  }

});
