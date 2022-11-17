<?php

namespace App\Http\Controllers;

use App\Mail\InviteMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendInviteMail(Request $request, User $user) {
        $base64Url = 'https://api.qrserver.com/v1/create-qr-code/?data=' . $user->internship['id']. '&size=100x100';
        Mail::to('jasper.coppens12@gmail.com')->send(new InviteMail($user->name, $base64Url));
    }

    private function createQRCodeString($internshipId) {
        $qrcode = array(
                "internshipId" => $internshipId,
        );

        return json_encode($qrcode);
    }

    private function createBase64Url($internshipId) {
        $qrCodeString = self::createQRCodeString($internshipId);

        return base64_encode($qrCodeString);
    }
}
