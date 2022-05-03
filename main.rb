require './envelope.rb';

env = Envelope.new()

print "Oggetto: "
env.subject = gets.chomp


print "Da: "
env.set_from(gets.chomp)

print "Quanti sono i destinatari: "

n_to = Integer(gets.chomp, exception: true)
n_to.times do |i|
  print "\tEmail #{i+1}: "
  email = gets.chomp
  env.add_to(email)
end

print "Vuoi aggiungere qualche email in Copia Carbone(CC)? (s/n): "
set_cc = gets.chomp == 's' ? true : false

if set_cc
  print "\tQuante email vuoi aggiungere: "

  n_cc = Integer(gets.chomp, exception: true)
  n_cc.times do |i|
    print "\tEmail #{i+1}: "
    email = gets.chomp
    env.add_cc(email)
  end
end

print "Vuoi aggiungere qualche email in Copia Carbone Nascosta(BCC)? (s/n): "
set_bcc = gets.chomp == 's' ? true : false

if set_bcc
  print "\tQuante email vuoi aggiungere: "

  n_bcc = Integer(gets.chomp, exception: true)
  n_bcc.times do |i|
    print "\tEmail #{i+1}: "
    email = gets.chomp
    env.add_bcc(email)
  end
end

print "\n[0] Testo\n"
print "[1] Template\n"
print ">>> "
option = gets.chomp

if option == "0"
  print "Scrivi il contenuto: "
  env.set_content(gets.chomp)
elsif option == "1"
  templates = env.get_templates()[:templates]
  templates.each_with_index do |item, index|
    puts "[#{index}] - #{item[:id]} - #{item[:name]}"
  end

  print "Seleziona un template (by index): "
  selected_index = Integer(gets.chomp, exception: true)

  env.template_id = templates[selected_index][:id]
  env.set_content("")

  data_to_send = {}

  print "Quanti dati ha da inserire questo template: "
  n_data = Integer(gets.chomp, exception: true)

  n_data.times do |i|
    print "Key: "
    key_name = gets.chomp
    print "Value: "
    value = gets.chomp

    data_to_send[key_name] = value
  end

  print "#{data_to_send}\n"
  env.set_data(data_to_send)
else
  print "Errore"
  exit(-1)  
end

env.send_email()