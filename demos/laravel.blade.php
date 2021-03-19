@extends ('layouts.main')

@section('title')
Welcome
@endsection

@hasSection('navigation')
<div class="flex w-full">
  @yield('navigation')
</div>
@endif

@section('showcase-header')
<header id="showcase" class="showcase flex w-full min-h-screen-3/4 overflow-hidden relative z-10">
  <div class="absolute inset-0">
    <img class="h-full w-full object-cover"
      src="https://images.unsplash.com/photo-1491582990992-68ec88e070a3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80"
      alt="Two people sitting by a lake.">
    <div class="absolute inset-0 bg-gradient-to-r from-indigo-200 to-indigo-400" style="mix-blend-mode: multiply;">
    </div>
  </div>
  <div class="header-container flex flex-col w-full z-10">
    <div class="flex flex-wrap items-center justify-center h-full">
      <div
        class="flex flex-col items-center justify-start md:justify-center w-full max-w-screen-xl mx-auto my-12 mb-6 md:my-20 md:mb-0 px-6 text-base sm:text-lg md:text-2xl text-shadow font-normal text-gray-100">
        <div class="w-full md:w-2/3 mr-auto">
          <h1
            class="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-white leading-tight mx-auto">
            Elit tempor ex exercitation
          </h1>
          <p class="leading-relaxed mx-auto my-4">
            Lorem deserunt dolor commodo consequat et nulla mollit nostrud nulla non nostrud duis eu. Laborum dolore
            sint
            est ex pariatur irure quis. Ea irure Lorem culpa fugiat proident nisi fugiat occaecat non ipsum dolore ipsum
            sunt et. Quis adipisicing sit labore occaecat ut ut dolore eu.
          </p>
        </div>
      </div>
    </div>
  </div>
</header>
@endsection

@section('main-content')
<main class="relative">
  {{-- BEGIN section --}}
  <section class="section-wrapper relative bg-white mx-auto py-12">
    <div class="app-container flex w-full max-w-screen-xl mx-auto px-6">
      <div class="content w-full mx-auto">
        <div class="py-4 md:py-8 border-b-4 border-gray-300 w-full">
          <h2 class="title w-full text-blue-900 font-bold text-3xl md:text-5xl text-left leading-tight">Fugiat velit
            incididunt ut ullamco aliquip.</h2>
        </div>
        <p class="text-xl text-gray-700 leading-relaxed my-8">Adipisicing est id sunt velit excepteur aute adipisicing
          velit. Exercitation do laborum nostrud cillum. Enim qui pariatur sit est pariatur sint aliqua culpa. Irure
          officia do ex pariatur duis in ea sit ea quis aliquip anim consectetur qui. Ipsum id laboris Lorem excepteur
          dolor deserunt laboris. Irure pariatur eu quis in quis amet mollit ea adipisicing amet incididunt. Et fugiat
          laboris dolore ipsum nisi nostrud Lorem voluptate laboris labore et in adipisicing deserunt.</p>

        <p class="text-xl text-gray-700 leading-relaxed my-8">Anim aliquip excepteur nisi consectetur mollit occaecat ut
          quis et elit aliqua. Nostrud irure et sint ut proident eu qui id ea qui ex elit nisi commodo. Mollit commodo
          tempor nisi est enim nisi enim nulla incididunt nostrud laborum tempor.</p>

        <p class="text-xl text-gray-700 leading-relaxed my-8">Labore non ullamco irure ad Lorem nostrud ut id anim sint
          do incididunt incididunt. Ullamco deserunt enim ad ullamco elit culpa ullamco. Lorem minim dolore mollit non
          commodo.</p>

        <p class="text-xl text-gray-700 leading-relaxed my-8">Exercitation aliquip Lorem exercitation dolore mollit non
          nostrud deserunt eu. Sit nulla quis tempor aliquip exercitation aute labore minim laborum exercitation esse
          incididunt id. Incididunt amet in fugiat aliquip minim id exercitation amet commodo aliqua sint enim
          reprehenderit qui. Eiusmod ut proident nulla do est sint laborum dolore. Id culpa quis eu sit irure tempor
          eiusmod. Cupidatat qui Lorem ad duis deserunt tempor enim proident ex. Ullamco proident anim proident aute
          ipsum sit aliquip qui aute eiusmod anim qui esse commodo. Excepteur sit proident qui veniam sit est.
          Fugiat voluptate nulla magna magna occaecat ex labore. Adipisicing cillum consequat esse consequat ipsum nisi
          nulla eiusmod Lorem nostrud exercitation. Dolore proident et dolore ad irure amet laboris amet. Enim culpa
          deserunt pariatur amet nulla laboris sunt ut ut non. Id incididunt veniam officia non incididunt velit tempor
          occaecat fugiat magna consectetur. Ut velit Lorem aute et ex mollit amet dolor proident. Nulla excepteur
          commodo excepteur aliquip eu nostrud.</p>

        <p class="text-xl text-gray-700 leading-relaxed my-8">Id occaecat aute eiusmod deserunt veniam nulla aliquip
          veniam. Ipsum laboris in sit Lorem et ad reprehenderit irure deserunt. Eu adipisicing tempor et minim
          exercitation ullamco labore consequat ut eiusmod enim est ea. Lorem irure cupidatat enim magna anim. Aliquip
          duis aliquip eiusmod ad quis quis adipisicing id laborum dolor proident dolor voluptate. Ullamco reprehenderit
          laboris non aute sint commodo elit nostrud veniam occaecat ut minim sit.</p>

        <h2 class="font-bold text-2xl md:text-3xl text-left text-gray-700 leading-tight md:leading-tight mt-12">
          Consequat ullamco proident dolor ipsum dolore id ea cillum ad amet mollit.
        </h2>
        <p class="text-xl text-gray-700 leading-relaxed my-8">Nisi ad amet sunt veniam proident mollit elit labore amet
          officia adipisicing nisi. Duis commodo dolor ut commodo dolore irure. Dolore velit sint nisi pariatur non
          officia dolor nulla ullamco id culpa incididunt eu. Veniam qui duis qui culpa et consectetur fugiat ad. In ea
          dolor qui veniam. Aliquip exercitation consectetur commodo eiusmod enim occaecat est veniam laborum aliquip
          excepteur culpa enim officia. Nisi magna eu eiusmod laboris culpa minim enim minim. Culpa ea adipisicing
          officia nostrud fugiat ex aute. Duis ex est occaecat adipisicing anim cillum in anim incididunt non ea
          deserunt ipsum velit.</p>
        <p class="text-xl text-gray-700 leading-relaxed my-8">Est esse irure Lorem magna sit consectetur mollit.
          Deserunt aliqua excepteur aliquip ullamco cillum aliquip magna elit laborum non ipsum commodo est. Esse
          exercitation culpa mollit ea dolore sunt dolore cupidatat amet non est ut reprehenderit. Labore do velit
          dolore cupidatat aliqua ea ullamco. Exercitation pariatur minim laborum cupidatat proident aliqua aliquip.
          Nisi consectetur ut laboris duis non aliquip.</p>
      </div>
    </div>
  </section>
</main>
@endsection