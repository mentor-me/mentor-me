// ------------------------------------------------------------------------------
// Update footer copyright year
// ------------------------------------------------------------------------------
// This function is responsible for automatically generate the correct
// date on footer copyright
(function() {
  var date = new Date();
  var currentYear = date.getFullYear();
  var currentYearNode = document.getElementsByClassName('copyright-current-year')[0];
  currentYearNode.innerHTML = currentYear;
}());

// ------------------------------------------------------------------------------
// Analytics events setup
// ------------------------------------------------------------------------------
(function () {
  // Create analytics objects for 'Apply' actions
  var apply = tracker.createAnalyticsObj('apply', [
    ['header',             'apply-header-navigation',     'Apply Now (Header - navigation)'],
    ['footer',             'apply-footer',                'Apply Now (Footer)'],
    ['homeHeroCTA',        'apply-home-hero-cta',         'Apply CTA button on Hero section of Homepage'],
    ['homeCTA1',           'apply-home-cta-1',            'Apply CTA button on top of Meeting the founders Section'],
    ['studentsCTA1',       'apply-students',              'Start an application now CTA 1 (Students Page)'],
    ['studentsCTA2',       'apply-students',              'Start an application now CTA 2 (Students Page)'],
    ['studentsCTA3',       'apply-students',              'Start an application now CTA 3 (Students Page)'],
    ['programCTA1',        'apply-program',               'Apply Now (Program Page)'],
    ['remoteCTAHero',      'apply-remote-cta-hero',       'Apply CTA on Hero'],
    ['remoteCTA1',         'apply-remote-cta-1',          'Apply CTA 1 (Remote-beta Page - inline text)'],
    ['remoteCTA2',         'apply-remote-cta-2',          'Apply CTA 2 (Remote-beta Page - sidebar)'],
    ['remoteCTA3',         'apply-remote-cta-3',          'Apply CTA 3 (Remote-beta Page - bottom cta box)'],
    ['curriculumCTA',      'apply-curriculum-cta',        'Apply CTA (Curriculum Page)'],
    ['faqCTA1',            'apply-faq-cta-1',             'How can I begin (FAQ Page)'],
    ['admissionsPrepCTA1', 'apply-admissions-prep-cta-1', 'Apply now CTA box (Admissions Preparation Page)']
  ]);

  // Create analytics objects for 'Email signup' actions
  var emailSignup = tracker.createAnalyticsObj('email-signup', [
    ['footer',      'email-signup-footer',      'Email signup form - Stay Informed (/footer)'],
    ['blogSidebar', 'email-signup-blogSidebar', 'Email signup form - Stay Informed (Blog sidebar)']
  ]);

  // Watch events
  tracker.watch([
    // ['click', '.apply__header',                apply.header],
    // ['click', '.apply__footer',                apply.footer],
    // ['click', '.apply__home-cta-hero',         apply.homeHeroCTA],
    // ['click', '.apply__home-cta-1',            apply.homeCTA1],
    // ['click', '.apply__students-cta-1',        apply.studentsCTA1],
    // ['click', '.apply__students-cta-2',        apply.studentsCTA2],
    // ['click', '.apply__students-cta-3',        apply.studentsCTA3],
    // ['click', '.apply__program-cta-1',         apply.programCTA1],
    // ['click', '.apply__remote-cta-hero',       apply.remoteCTAHero],
    // ['click', '.apply__remote-cta-1',          apply.remoteCTA1],
    // ['click', '.apply__remote-cta-2',          apply.remoteCTA2],
    // ['click', '.apply__remote-cta-3',          apply.remoteCTA3],
    // ['click', '.apply__curriculum-cta',        apply.curriculumCTA],
    // ['click', '.apply__faq-cta-1',             apply.faqCTA1],
    // ['click', '.apply__admissions-prep-cta-1', apply.admissionsPrepCTA1],
    // Email Events
    ['click', '.email-signup__footer',         emailSignup.footer],
    ['click', '.email-signup__blog-sidebar',   emailSignup.blogSidebar]
  ]);
}());

// ------------------------------------------------------------------------------
// Initialize Navigation Plugin
// ------------------------------------------------------------------------------
(function () {
  var nav = responsiveNav('.nav-collapse', {
    toggleContainer: '.main-nav__header'
  });
}());
