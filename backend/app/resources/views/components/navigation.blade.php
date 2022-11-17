<header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin-panel">Home</a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li> -->
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownCsv" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Import via csv
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownCsv">
                    <li><a class="dropdown-item" href="/admin-panel/upload-students-by-csv">Students</a></li>
                    <li><a class="dropdown-item" href="/admin-panel/upload-teachers-by-csv">Teachers</a></li>
                    <!-- <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li> -->
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownForm" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Import via form
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownForm">
                    <li><a class="dropdown-item" href="#">Student</a></li>
                    <li><a class="dropdown-item" href="#">Teacher</a></li>
                    <li><a class="dropdown-item" href="#">Mentor</a></li>
                </ul>
            </li>
            <!-- <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
            </li> -->
        </ul>
        <!-- <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
        </div>
    </div>
    </nav>
</header>