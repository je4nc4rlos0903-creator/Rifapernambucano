const numbersDiv = document.getElementById('numbers')
    button.innerText = item.number

    if (item.status === 'available') {
      button.style.background = '#22c55e'
    }

    if (item.status === 'reserved') {
      button.style.background = '#eab308'
    }

    if (item.status === 'paid') {
      button.style.background = '#ef4444'
    }

    button.onclick = () => {

      if (item.status !== 'available') {
        return
      }

      selectedNumber = item

      modal.classList.remove('hidden')

      modalNumber.innerText = `Número ${item.number}`
    }

    numbersDiv.appendChild(button)
  })
}

function closeModal() {
  modal.classList.add('hidden')
}

async function reserveNumber() {

  const name = document.getElementById('name').value
  const phone = document.getElementById('phone').value

  if (!name || !phone) {
    alert('Preencha tudo')
    return
  }

  const { error } = await supabaseClient
    .from('rifa_numbers')
    .update({
      status: 'reserved',
      buyer_name: name,
      buyer_phone: phone
    })
    .eq('id', selectedNumber.id)

  if (error) {
    alert('Erro ao reservar')
    return
  }

  alert('Número reservado')

  closeModal()

  loadNumbers()
}

loadNumbers()
