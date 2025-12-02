<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;

class PokemonController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('limit', 20);
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $limit;

        $response = Http::get("https://pokeapi.co/api/v2/pokemon", [
            'limit' => $limit,
            'offset' => $offset,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch from PokeAPI'], 500);
        }

        $results = $response->json()['results'];

        $responses = Http::pool(function (Pool $pool) use ($results) {
            foreach ($results as $pokemon) {
                $pool->as($pokemon['name'])->get($pokemon['url']);
            }
        });

        $formattedData = [];

        foreach ($results as $pokemon) {
            $details = $responses[$pokemon['name']];
            
            if ($details->successful()) {
                $data = $details->json();
                $types = collect($data['types'])->pluck('type.name')->toArray();

                $formattedData[] = [
                    'name' => $pokemon['name'],
                    'image' => $data['sprites']['other']['official-artwork']['front_default'],
                    'types' => $types,
                    'height' => $data['height'],
                    'weight' => $data['weight'],
                ];
            }
        }

        return response()->json($formattedData);
    }
}