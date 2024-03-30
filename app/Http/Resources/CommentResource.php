<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public $preserveKeys = true;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => [
                'name' => $request->user()->name
            ],
            'text' => $this->text,
            'created_at' => $this->created_at,
        ];
    }
}
