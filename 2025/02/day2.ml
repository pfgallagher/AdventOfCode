let repeats_twice str =
  let len = String.length str in
  if len mod 2 <> 0 then false
  else
    let midpoint = len / 2 in
    let left = String.sub str 0 midpoint in
    let right = String.sub str midpoint midpoint in
    left = right

let find_longest_prefixes str =
  let len = String.length str in
  let longest_prefixes = Array.make len 0 in
  let matched = ref 0 in
  for i = 1 to len - 1 do
    while !matched > 0 && str.[i] <> str.[!matched] do
      matched := longest_prefixes.(!matched - 1)
    done;
    if str.[i] = str.[!matched] then incr matched;
    longest_prefixes.(i) <- !matched
  done;
  longest_prefixes

let repeats str =
  let longest_prefixes = find_longest_prefixes str in
  let k = longest_prefixes.(Array.length longest_prefixes - 1) in
  let repeat_size = String.length str - k in
  0 < k && String.length str mod repeat_size = 0

let read_file path = In_channel.with_open_text path In_channel.input_all

let split s c =
  match String.split_on_char c s with
  | [ left; right ] -> Some (left, right)
  | _ -> None

let () =
  let contents = read_file "day2.txt" in
  let ranges = String.split_on_char ',' contents in
  let total = ref 0 in
  List.iter
    (fun range ->
      match split range '-' with
      | Some (left, right) ->
          for i = int_of_string left to int_of_string right do
            if repeats_twice (string_of_int i) then total := !total + i
          done
      | None -> ())
    ranges;
  print_endline (string_of_int !total)

let () =
  let contents = read_file "day2.txt" in
  let ranges = String.split_on_char ',' contents in
  let total = ref 0 in
  List.iter
    (fun range ->
      match split range '-' with
      | Some (left, right) ->
          for i = int_of_string left to int_of_string right do
            if repeats (string_of_int i) then total := !total + i
          done
      | None -> ())
    ranges;
  print_endline (string_of_int !total)
