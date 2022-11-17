@extends('adminPanel.master')

@section('title' , 'Admin Panel - import by csv')

@include('components.navigation')

@section('pagecontent')
<div class="body-wrapper">
    @php
        $uploadStudentsOrTeachers = request()->is("admin-panel/upload-students-by-csv") ? 'students' : 'teachers';
    @endphp
    <h1>Upload {{ $uploadStudentsOrTeachers }} by CSV</h1>

    <p>Uitleg over bestand uploaden</p>
    <form method='post' action="{{'/admin-panel/upload-' . $uploadStudentsOrTeachers . '-by-csv'}}" accept-charset="UTF-8" enctype="multipart/form-data">
    @csrf
        <div class="mb-3">
            <label for="file-upload" class="form-label">Select CSV</label>
            <input class="form-control" type="file" id="file-upload"  name="file-upload">
        </div>

        <button type="submit" class="btn btn-primary">Upload csv</button>
    </form>
</div>

@endsection