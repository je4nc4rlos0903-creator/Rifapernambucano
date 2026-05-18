const adminList = document.getElementById('admin-list')

async function loadAdmin() {

  const { data } = await supabaseClient
    .from('rifa_numbers')
    .select('*')
    .neq('status', 'available')
    .order('number')

  adminList.innerHTML = ''

  data.forEach(item => {

    const div = document.createElement('div')

    div.style.background = '#1e293b'
    div.style.padding = '20px'
    div.style.marginBottom = '15px'
    div.style.borderRadius = '15px'

    div.innerHTML = `
      <h2>Número ${item.number}</h2>
      <p>Nome: ${item.buyer_name}</p>
      <p>Telefone: ${item.buyer_phone}</p>
      <p>Status: ${item.status}</p>

      <button onclick="approve(${item.id})">
        Aprovar
      </button>

      <button onclick="resetNumber(${item.id})">
        Liberar
      </button>
    `

    adminList.appendChild(div)
  })
}

async function approve(id) {

  await supabaseClient
    .from('rifa_numbers')
    .update({ status: 'paid' })
    .eq('id', id)

  loadAdmin()
}

async function resetNumber(id) {

  await supabaseClient
    .from('rifa_numbers')
    .update({
      status: 'available',
      buyer_name: null,
      buyer_phone: null
    })
    .eq('id', id)

  loadAdmin()
}

loadAdmin()
